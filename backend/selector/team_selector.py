from autogen_agentchat.teams import SelectorGroupChat
from autogen_agentchat.ui import Console
from selector.athena_multi_agents import course_planner, research_agent, content_writer, content_validator, quiz_master, critique_agent, course_assembler
from common.models import o3_mini_model_client
from common.config import termination_condition

model_client = o3_mini_model_client

# Maintain shared state (like a blackboard)
state = {
    "user_request": None,
    "course_plan": None,
    "research_data": None,
    "lesson_content": None,
    "validated": False,
    "quiz": None,
    "feedback": None,
}

# Selector function to route messages to the correct agent
def selector(message, agents):
    content = message["content"].lower()

    if "create a course" in content:
        state["user_request"] = content
        return "course_planner"

    elif "course plan" in content and "modules" in content:
        state["course_plan"] = content
        return "research_agent"

    elif "research summary" in content:
        state["research_data"] = content
        return "content_writer"

    elif "lesson content" in content and "explanation" in content:
        state["lesson_content"] = content
        return "content_validator"

    elif "approved" in content or "issues" in content:
        state["validated"] = True
        return "quiz_master"

    elif "quiz questions" in content:
        state["quiz"] = content
        return "critique_agent"

    elif "feedback" in content or "suggestions" in content:
        state["feedback"] = content
        return "course_assembler"

    else:
        return "user_proxy"




# Build the selector-based group
team = SelectorGroupChat(
    [
        course_planner,
        research_agent,
        content_writer,
        content_validator,
        quiz_master,
        critique_agent,
        course_assembler,
    ],
    model_client=model_client,
    # selector_func=selector,
    termination_condition=termination_condition,
)



async def run_team_selector() -> None:
    try:
        
        task = "Create a course on AI agents using Autogen."
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