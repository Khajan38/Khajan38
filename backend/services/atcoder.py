from datetime import datetime
from selectolax.parser import HTMLParser
from routes.cp_structures import (PlatformStats, PlatformContribution, PlatformResult, ContestHistory)

def atcoder_rank_title(rating: int | None):
    if rating is None: return None
    if rating < 400: return "#808080"
    if rating < 800: return "#804000"
    if rating < 1200: return "#008000"
    if rating < 1600: return "#00C0C0"
    if rating < 2000: return "#0000FF"
    if rating < 2400: return "#C0C000"
    if rating < 2800: return "#FF8000"
    return "#FF0000"

async def fetch_atcoder(username: str, client) -> PlatformResult:
    profile_url = f"https://atcoder.jp/users/{username}"
    history_url = f"https://atcoder.jp/users/{username}/history/json"
    profile_res = await client.get(profile_url)
    history_res = await client.get(history_url)
    html = HTMLParser(profile_res.text)

    # ---------- PROFILE ----------
    current_rating = None
    max_rating = None
    rows = html.css("table tr")
    for row in rows:
        th = row.css_first("th")
        td = row.css_first("td")
        if not th or not td: continue
        key = th.text(strip=True)
        text = td.text(strip=True)
        if key == "Rating":
            digits = "".join(c for c in text if c.isdigit())
            if digits: current_rating = int(digits)
        elif key == "Highest Rating":
            digits = "".join(c for c in text if c.isdigit())
            if digits: max_rating = int(digits)
    rank_title = atcoder_rank_title(current_rating)

    # ---------- HISTORY ----------
    history_json = history_res.json()
    max_rating = current_rating
    history = []
    for item in history_json:
        rating = item.get("NewRating")
        ts = item.get("EndTime")
        if rating is None or ts is None: continue
        timestamp = int(datetime.fromisoformat(ts.replace("Z", "+00:00")).timestamp())
        history.append(ContestHistory(contest=item.get("ContestName"), rating=rating, timestamp=timestamp,))
        if rating: max_rating = (rating if max_rating is None else max(max_rating, rating))
    contests = len(history)
    stats = PlatformStats(
        platform="atcoder",
        username=username,
        current_rating=current_rating,
        max_rating=max_rating,
        rank_title=rank_title,
        contests=contests,
        history=history,
    )

    # ---------- CONTRIBUTION ----------
    contrib = PlatformContribution()
    contrib.contests = contests
    return PlatformResult(stats=stats, contrib=contrib)