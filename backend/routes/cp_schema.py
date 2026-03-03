from fastapi import APIRouter
from datetime import datetime, timedelta
from dataclasses import asdict
from config import db, CP_PROFILE_LINKS, CP_USERNAMES
from routes.aggregator import fetch_all
cp_router = APIRouter()
CACHE_DURATION_HOURS = 12

def serialize_cp_data(data: dict) -> dict:
    return {
        "platforms": [asdict(p) for p in data["platforms"]],
        "global": asdict(data["global"]),
    }

@cp_router.get("/cp/platforms")
async def get_all_platforms():
    return {"message": "Successfully Grabbed", "usernames": CP_USERNAMES, "links": CP_PROFILE_LINKS}

@cp_router.get("/cp")
async def get_cp_data():
    collection = db["cp_stats"]
    cached = await collection.find_one({"type": "aggregate"})
    if cached:
        last_updated = cached.get("last_updated")
        if last_updated:
            age = datetime.utcnow() - last_updated
            if age < timedelta(hours=CACHE_DURATION_HOURS):
                return {"source": "cache", "data": cached["data"], "last_updated": last_updated,}
    fresh_data = await fetch_all()
    mongo_data = serialize_cp_data(fresh_data)
    await collection.update_one({"type": "aggregate"},{"$set": {"type": "aggregate", "data": mongo_data, "last_updated": datetime.utcnow(),}}, upsert=True)
    return {"source": "fresh", "data": mongo_data}

@cp_router.post("/cp/refresh")
async def refresh_cp_data():
    collection = db["cp_stats"]
    fresh_data = await fetch_all()
    mongo_data = serialize_cp_data(fresh_data)
    await collection.update_one({"type": "aggregate"},{"$set": {
        "type": "aggregate",
        "data": mongo_data,
        "last_updated": datetime.utcnow(),
    }}, upsert=True)
    return {"message": "Refreshed successfully", "data": mongo_data}