from autogen_agentchat.teams import SelectorGroupChat
from autogen_agentchat.ui import Console
from selector.athena_multi_agents import course_planner, module_researcher, lesson_writer, quiz_maker, course_assembler
from common.models import o3_mini_model_client
from common.config import termination_condition
from common.config import store_final_course, get_final_course

model_client = o3_mini_model_client
"""
# Selector function to route messages to the correct agent
def selector(messages):
    source_agent = messages[-1].source

    if source_agent == "user":
        return "course_planner"

    elif source_agent == "course_planner":
        return "research_agent"

    elif source_agent == "research_agent":
        return "content_writer"

    elif source_agent == "content_writer":
        return "content_validator"

    elif source_agent == "content_validator":
        return "quiz_master"

    elif source_agent == "quiz_master":
        return "critique_agent"

    elif source_agent == "critique_agent":
        return None
    
    return None

# 3. Selector Function for deciding handoffs
def selector(messages):
    last_message = messages[-1]
    content = last_message.content.lower()

    if "terminate" in content:
        return None
    if "course structure" in content or "modules" in content:
        return "module_researcher"
    if "module research" in content or "concepts found" in content:
        return "lesson_writer"
    if "lesson written" in content or "lesson ready" in content:
        return "quiz_maker"
    if "quiz created" in content or "quiz ready" in content:
        return "content_validator"
    if "validated" in content or "issues found" in content:
        return "critique_agent"
    if "feedback" in content or "critique complete" in content:
        return "course_assembler"
    return None  # Let it fall back naturally if unclear
"""
# Build the selector-based group
team = SelectorGroupChat(
    [
        course_planner,
        module_researcher,
        lesson_writer,
        #content_validator,
        quiz_maker,
        #critique_agent,
        course_assembler,
    ],
    model_client=model_client,
    # selector_func=selector,
    termination_condition=termination_condition,
)

async def run_team_selector(query) -> None:
    try:
        # task = "Create a course on AI agents using Autogen."
        task_result = await Console(team.run_stream(task=query))
        final_course_content = get_final_course(task_result.messages)
        store_final_course(final_course_content)
        return final_course_content
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""
    finally:
        # Ensure the client session is closed properly
        await model_client.close()