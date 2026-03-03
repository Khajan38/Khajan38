from routes.cp_structures import (PlatformStats, PlatformContribution, PlatformResult, ContestHistory)

CF_INFO = "https://codeforces.com/api/user.info"
CF_RATING = "https://codeforces.com/api/user.rating"
CF_STATUS = "https://codeforces.com/api/user.status"

async def fetch_codeforces(handle: str, client) -> PlatformResult:
    info_res = await client.get(CF_INFO, params={"handles": handle})
    rating_res = await client.get(CF_RATING, params={"handle": handle})
    status_res = await client.get(CF_STATUS, params={"handle": handle})
    info_json = info_res.json()
    rating_json = rating_res.json()
    status_json = status_res.json()

    # ---------- PLATFORM STATS ----------
    user = info_json["result"][0]
    current_rating = user.get("rating")
    max_rating = user.get("maxRating")
    rank_title = user.get("rank")
    rating_history_raw = rating_json.get("result", [])
    history = []
    for r in rating_history_raw:
        history.append(ContestHistory(
            contest=r["contestName"],
            rating=r["newRating"],
            timestamp=r["ratingUpdateTimeSeconds"],
        ))
    stats = PlatformStats(
        platform="codeforces",
        username=handle,
        current_rating=current_rating,
        max_rating=max_rating,
        rank_title=rank_title,
        contests=len(history),
        history=history,
    )

    # ---------- CONTRIBUTION ----------
    contrib = PlatformContribution()
    contrib.contests = stats.contests
    submissions = status_json.get("result", [])
    solved_set = set()
    total_submissions = len(submissions)
    for sub in submissions:
        if sub.get("verdict") == "OK":
            problem_id = (sub["problem"]["contestId"], sub["problem"]["index"])
            solved_set.add(problem_id)
    contrib.solved = len(solved_set)
    contrib.submissions = total_submissions
    contrib.badges = []
    contrib.cp_difficulty = {"Codeforces": len(solved_set)}
    return PlatformResult(stats=stats, contrib=contrib)