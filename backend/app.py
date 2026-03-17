import os
from fastapi import FastAPI
from contextlib import asynccontextmanager
from scheduler.jobs import start_scheduler
from fastapi.middleware.cors import CORSMiddleware
from config import mongo_client
from routes.cp_schema import cp_router
from routes.dsa_mode import dsa_mode_router
BASE_URI = os.getenv("BASE_URI")

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🛑 Application starting up")
    start_scheduler()
    yield # Runs app here
    print("🛑 Application shutting down")
    mongo_client.close()

app = FastAPI(title="Portfolio: Khajan Bhatt", lifespan=lifespan)
app.include_router(cp_router, prefix="/api", tags=["CP Platforms Management"])
app.include_router(dsa_mode_router, prefix="/api", tags=["CP Platforms Management"])

app.add_middleware(CORSMiddleware, allow_origins=[BASE_URI], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
async def rootBackend():
    return {
        "message": "Portfolio Backend API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "prefix": '/api',
            "technical section": ['/cp', '/cp/refresh', '/cp/platforms']
        }
    }

@app.get("/api")
async def rootFrontend():
    return {
        "message": "Portfolio Backend API",
        "version": "1.0.0",
        "status": "running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)