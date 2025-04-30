import asyncio
import sys
from swarm.team_swarm import run_team_swarm
from selector.team_selector import run_team_selector

# asyncio.run(run_team_swarm())
# asyncio.run(run_team_selector())
from fastapi import FastAPI

app = FastAPI()

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

@app.get("/")
async def root():
    data = await run_team_selector()
    return {"message": data}
