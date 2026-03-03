import os
import sys
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# -------------------------
# Root Path & Environment
# -------------------------
root_path = os.path.abspath(os.path.join(os.path.dirname(__file__)))
if root_path not in sys.path:
    sys.path.append(root_path)

# -------------------------
# Load .env from project root
# -------------------------
dotenv_path = os.path.join(root_path, ".env")
load_dotenv(dotenv_path)

# -------------------------
# Logger for Debugging in FastAPI
# -------------------------
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# -------------------------
# MongoDB Configuration
# -------------------------
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
MONGO_DB_NAME = "Portfolio"
mongo_client = AsyncIOMotorClient(MONGO_URI)
db = mongo_client[MONGO_DB_NAME]

# -------------------------
# Competitive Programming Usernames
# -------------------------
CP_USERNAMES = {
    "leetcode": os.getenv("LEETCODE_USERNAME"),
    "codeforces": os.getenv("CODEFORCES_USERNAME"),
    "codechef": os.getenv("CODECHEF_USERNAME"),
    "codestudio": os.getenv("CODESTUDIO_USERNAME"),
    "atcoder": os.getenv("ATCODER_USERNAME"),
    "GFG": os.getenv("GFG_USERNAME"),
    "hackerrank": os.getenv("HACKERRANK_USERNAME"),
    "interviewbit": os.getenv("INTERVIEWBIT_USERNAME"),
    "codolio": os.getenv("CODOLIO_USERNAME",)
}

# -------------------------
# Profile Links
# -------------------------
CP_PROFILE_LINKS = {
    "codolio": f"https://codolio.com/profile/{CP_USERNAMES['codolio']}",
    "leetcode": f"https://leetcode.com/u/{CP_USERNAMES['leetcode']}",
    "codeforces": f"https://codeforces.com/profile/{CP_USERNAMES['codeforces']}",
    "codechef": f"https://www.codechef.com/users/{CP_USERNAMES['codechef']}",
    "atcoder": f"https://atcoder.jp/users/{CP_USERNAMES['atcoder']}",
    "GFG": f"https://www.geeksforgeeks.org/profile/{CP_USERNAMES['GFG']}",
    "codestudio": f"https://www.naukri.com/code360/profile/{CP_USERNAMES['codestudio']}",
    "interviewbit": f"https://www.interviewbit.com/profile/{CP_USERNAMES['interviewbit']}",
    "hackerrank": f"https://www.hackerrank.com/profile/{CP_USERNAMES['hackerrank']}"
}

# -------------------------
# URL NORMALIZER
# -------------------------
from urllib.parse import urljoin
def normalize_icon(icon: str | None, base_url: str) -> str | None:
    if not icon: return None
    return urljoin(base_url, icon)