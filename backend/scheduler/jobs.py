from apscheduler.schedulers.asyncio import AsyncIOScheduler
from datetime import datetime
from config import db, logger
from routes.cp_schema import fetch_and_store

scheduler = AsyncIOScheduler()

async def scheduled_cp_refresh():
    collection = db["cp_stats"]
    logger.info("Running scheduled CP refresh at %s", datetime.utcnow())
    await fetch_and_store(collection)

def start_scheduler():
    if not scheduler.running:
        scheduler.add_job(scheduled_cp_refresh, "interval", hours=12)
        scheduler.start()