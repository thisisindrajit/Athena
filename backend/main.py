import asyncio
import dotenv
from typing import Any, Dict, List
from autogen_agentchat.conditions import HandoffTermination, TextMentionTermination
from autogen_agentchat.messages import HandoffMessage
from autogen_agentchat.teams import Swarm
from autogen_agentchat.ui import Console
from athena_agents import course_planner, research_agent, content_writer, content_validator, quiz_master, critique_agent, course_assembler
from models import o3_mini_model_client

dotenv.load_dotenv()
model_client = o3_mini_model_client

termination = HandoffTermination(target="user") | TextMentionTermination("TERMINATE")
team = Swarm([course_planner, research_agent, content_writer, content_validator, quiz_master, critique_agent, course_assembler], termination_condition=termination)

task = "Courser Request on AI agents using Autogen."

async def run_team_stream() -> None:
    try:
        task_result = await Console(team.run_stream(task=task))
        last_message = task_result.messages[-1]
        """while isinstance(last_message, HandoffMessage) and last_message.target == "user":
            user_message = input("User: ")

            task_result = await Console(
                team.run_stream(task=HandoffMessage(source="user", target=last_message.source, content=user_message))
            )
            last_message = task_result.messages[-1]"""
    finally:
        # Ensure the client session is closed properly
        await model_client.close()

asyncio.run(run_team_stream())