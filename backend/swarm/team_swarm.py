from typing import Any, Dict, List
from autogen_agentchat.teams import Swarm
from autogen_agentchat.ui import Console
from swarm.athena_assistant_agents import course_planner, research_agent, content_writer, content_validator, quiz_master, critique_agent, course_assembler
from common.models import o3_mini_model_client
from common.config import termination_condition

model_client = o3_mini_model_client

team = Swarm([course_planner, research_agent, content_writer, content_validator, quiz_master, critique_agent, course_assembler], 
             termination_condition=termination_condition)

async def run_team_swarm() -> None:
    try:
        
        task = "Course Request on AI agents using Autogen."
        task_result = await Console(team.run_stream(task=task))
        """
        last_message = task_result.messages[-1]
        while isinstance(last_message, HandoffMessage) and last_message.target == "user":
            user_message = input("User: ")

            task_result = await Console(
                team.run_stream(task=HandoffMessage(source="user", target=last_message.source, content=user_message))
            )
            last_message = task_result.messages[-1]
        """
    finally:
        # Ensure the client session is closed properly
        await model_client.close()