# import asyncio
# from swarm.team_swarm import run_team_swarm
# from selector.team_selector import run_team_selector

# # asyncio.run(run_team_swarm())
# asyncio.run(run_team_selector())
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}
