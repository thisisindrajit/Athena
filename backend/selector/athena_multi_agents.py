from autogen_agentchat.agents import AssistantAgent
from autogen_ext.agents.web_surfer import MultimodalWebSurfer
from common.models import o3_mini_model_client

model_client = o3_mini_model_client

course_planner = AssistantAgent(
    name="course_planner",
    model_client=model_client,
    system_message="You design the high-level structure of the course and break it into modules.",
)

research_agent = MultimodalWebSurfer(
    name="research_agent",
    model_client=model_client,
    description="You research the given sub-topic using the web and return a concise summary.",
)

content_writer = AssistantAgent(
    name="content_writer",
    model_client=model_client,
    system_message="Write conceptually deep, beginner-friendly lessons with analogies based on the research.",
)

content_validator = MultimodalWebSurfer(
    name="content_validator",
    model_client=model_client,
    description="Fact-check and review the lesson content for safety and accuracy using the web. Return Approved or list issues.",
)

quiz_master = AssistantAgent(
    name="quiz_master",
    model_client=model_client,
    system_message="Create quiz questions and simple exercises based on the validated lesson.",
)

critique_agent = AssistantAgent(
    name="critique_agent",
    model_client=model_client,
    system_message="Provide feedback on lesson and quiz quality, clarity, alignment with user preferences.",
)

course_assembler = AssistantAgent(
    name="course_assembler",
    model_client=model_client,
    system_message="Assemble the final course with all lessons and quizzes in structured Markdown or JSON.",
)
