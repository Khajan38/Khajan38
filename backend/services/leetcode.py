import httpx
from config import normalize_icon
from routes.cp_structures import (PlatformStats, PlatformContribution, PlatformResult, ContestHistory, Badge)
LEETCODE_URL = "https://leetcode.com/graphql"
LEETCODE_BASE = "https://leetcode.com/"

async def fetch_leetcode(username: str, client: httpx.AsyncClient) -> PlatformResult:
    query = {
        "query": """
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            profile {
              ranking
              starRating
            }
            badges {
              displayName
              icon
            }
          }
          userContestRanking(username: $username) {
            rating
            attendedContestsCount
          }
          userContestRankingHistory(username: $username) {
            attended
            rating
            contest {
              title
              startTime
            }
          }
        }
        """,
        "variables": {"username": username},
    }
    response = await client.post(LEETCODE_URL, json=query)
    data = response.json()["data"]
    matched = data.get("matchedUser")
    contest_info = data.get("userContestRanking")
    contest_history_raw = data.get("userContestRankingHistory") or []

    # ---------- PLATFORM STATS ----------
    current_rating = None
    contests = None
    if contest_info:
        current_rating = contest_info.get("rating")
        contests = contest_info.get("attendedContestsCount")
    history: list[ContestHistory] = []
    max_rating = None
    for h in contest_history_raw:
        if not h.get("attended"): continue
        rating = h.get("rating")
        timestamp = h["contest"]["startTime"]
        history.append(ContestHistory(contest=h["contest"]["title"], rating=rating, timestamp=timestamp))
        if rating is not None:
            max_rating = (rating if max_rating is None else max(max_rating, rating))
    rank_title = None
    for b in matched.get("badges", []):
        if b["displayName"] == "Guardian": rank_title = "Guardian"
        elif b["displayName"] == "Knight": rank_title = "Knight"
    stats = PlatformStats(
        platform="leetcode",
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
    if matched:
        diff_map = {}
        total_submissions = 0
        for item in matched["submitStatsGlobal"]["acSubmissionNum"]:
            diff = item["difficulty"]
            count = item["count"]
            if diff == "All":
                contrib.solved = count
                continue
            subs = item.get("submissions", 0)
            diff_map[diff] = count
            total_submissions += subs
        contrib.submissions = total_submissions
        contrib.difficulty = diff_map
        contrib.badges = [
            Badge(name=b["displayName"], icon=normalize_icon(b.get("icon"), LEETCODE_BASE))
            for b in matched.get("badges", [])
        ]

    return PlatformResult(stats=stats, contrib=contrib)