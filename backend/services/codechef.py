import re
import json
from datetime import datetime
from selectolax.parser import HTMLParser
from routes.cp_structures import (PlatformStats, PlatformContribution, PlatformResult, ContestHistory)
from config import logger

async def fetch_codechef(username: str, client) -> PlatformResult:
    url = f"https://www.codechef.com/users/{username}"
    response = await client.get(url)
    html = HTMLParser(response.text)

    # ---------- PROFILE ----------
    rating_node = html.css_first(".rating-number")
    rating = int(rating_node.text(strip=True)) if rating_node else None
    stars_node = html.css_first(".rating")
    rank_title = stars_node.text(strip=True) if stars_node else None
    max_rating = None
    max_node = html.css_first(".rating-header small")
    if max_node:
        m = re.search(r"(\d+)", max_node.text())
        if m: max_rating = int(m.group(1))

    # ---------- CONTEST HISTORY ----------
    history = []
    max_rating_calc = max_rating
    script_nodes = html.css("script")
    for script in script_nodes:
        text = script.text()
        if "all_rating" not in text: continue
        match = re.search(r"all_rating\s*=\s*(\[[\s\S]*?\])", text, re.DOTALL)
        if not match: continue
        data = json.loads(match.group(1))
        for item in data:
            rating_val = item.get("rating")
            if rating_val is not None:
                try: rating_val = int(rating_val)
                except Exception: rating_val = None
            ts = item.get("end_date")
            if not ts: continue
            timestamp = int(datetime.strptime(ts, "%Y-%m-%d %H:%M:%S").timestamp())
            history.append(ContestHistory(contest=item.get("code"), rating=rating_val, timestamp=timestamp))
            if rating_val: max_rating_calc = (rating_val if max_rating_calc is None else max(max_rating_calc, rating_val))
        break
    contests = len(history)
    stats = PlatformStats(
        platform="codechef",
        username=username,
        current_rating=rating,
        max_rating=max_rating_calc,
        rank_title=rank_title,
        contests=contests,
        history=history,
    )

    # ---------- CONTRIBUTION ----------
    contrib = PlatformContribution()
    contrib.contests = contests
    for node in html.css("h3"):
        text = node.text(strip=True)
        if "Total Problems Solved" in text:
            m = re.search(r"(\d+)", text)
            if m: contrib.solved = int(m.group(1))
            break
    contrib.cp_difficulty = {"Codechef": contrib.solved}
    return PlatformResult(stats=stats, contrib=contrib)