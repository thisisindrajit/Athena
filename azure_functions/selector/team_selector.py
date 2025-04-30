from autogen_agentchat.teams import SelectorGroupChat
from autogen_agentchat.ui import Console
from selector.athena_multi_agents import course_planner, module_researcher, lesson_writer, quiz_maker, course_assembler
from common.models import o3_mini_model_client
from common.config import termination_condition
from common.config import store_final_course, get_final_course

model_client = o3_mini_model_client

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
    termination_condition=termination_condition,
)

async def run_team_selector(query) -> None:
    try:
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