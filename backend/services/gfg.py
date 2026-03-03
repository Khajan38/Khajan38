import httpx
from routes.cp_structures import (PlatformStats, PlatformContribution, PlatformResult)
from config import logger
API = "https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/"
HEADERS = {"User-Agent": "Mozilla/5.0", "Accept": "application/json",}

def compute_coding_score(diff: dict) -> int:
    basic = diff.get("Basic", 0)
    easy = diff.get("Easy", 0)
    medium = diff.get("Medium", 0)
    hard = diff.get("Hard", 0)
    return basic + easy * 2 + medium * 4 + hard * 8

async def fetch_gfg(username: str, client: httpx.AsyncClient) -> PlatformResult:
    payload = {"handle": username, "page": 1,}
    res = await client.post(API, json=payload, headers=HEADERS,)
    if res.status_code != 200:
        logger.error(f"GFG API failed: {res.text}")
        return PlatformResult(stats=PlatformStats(username, None, None, None, None), contrib=PlatformContribution())
    data = res.json()
    result = data.get("result", {})
    total_count = data.get("count", 0)
    difficulty = {}
    for diff_name, problems in result.items(): difficulty[diff_name] = len(problems)
    total_solved = sum(difficulty.values())
    coding_score = compute_coding_score(difficulty)
    badges = []

    stats = PlatformStats(
        platform="GFG",
        username=username,
        current_rating=coding_score,
        max_rating=coding_score,
        rank_title=None,
        contests=None,
        history=[],
    )

    contrib = PlatformContribution()
    contrib.solved = total_solved
    contrib.submissions = total_solved if total_count != 0 else total_count
    contrib.difficulty = difficulty
    contrib.badges = badges
    return PlatformResult(stats=stats, contrib=contrib)