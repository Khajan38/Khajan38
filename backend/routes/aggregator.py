import asyncio, httpx
from services.leetcode import fetch_leetcode
from services.codeforces import fetch_codeforces
from services.codechef import fetch_codechef
from services.atcoder import fetch_atcoder
from services.gfg import fetch_gfg
from config import CP_USERNAMES
from routes.cp_structures import GlobalStats, PlatformResult

def build_global_stats(results: list[PlatformResult]) -> GlobalStats:
    global_stats = GlobalStats()
    for r in results:
        c = r.contrib
        global_stats.total_solved += c.solved
        global_stats.total_contests += c.contests
        global_stats.total_submissions += c.submissions
        global_stats.badges.extend(c.badges)
        for k, v in c.difficulty.items():
            global_stats.difficulty[k] = (global_stats.difficulty.get(k, 0) + v)
            global_stats.total_dsa_solved += v
        for k, v in c.cp_difficulty.items():
            global_stats.cp_difficulty[k] = (global_stats.difficulty.get(k, 0) + v)
            global_stats.total_cp_solved += v
    return global_stats

async def fetch_all():
    async with httpx.AsyncClient(timeout=25) as client:
        tasks = [
            fetch_leetcode(CP_USERNAMES["leetcode"], client),
            fetch_codeforces(CP_USERNAMES["codeforces"], client),
            fetch_codechef(CP_USERNAMES["codechef"], client),
            fetch_atcoder(CP_USERNAMES["atcoder"], client),
            fetch_gfg(CP_USERNAMES["GFG"], client)
        ]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        platform_results: list[PlatformResult] = []
        for r in results:
            if isinstance(r, Exception): continue
            platform_results.append(r)
        global_stats = build_global_stats(platform_results)

    return {
        "platforms": [r.stats for r in platform_results],
        "global": global_stats
    }