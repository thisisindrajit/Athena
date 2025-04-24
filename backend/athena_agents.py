from autogen_agentchat.agents import AssistantAgent
from autogen_ext.agents.web_surfer import MultimodalWebSurfer
from autogen.agentchat.contrib.web_tools import web_search
from models import o3_mini_model_client

model_client = o3_mini_model_client

# Course Planner Agent
course_planner = AssistantAgent(
    name="course_planner",
    model_client=model_client,
    handoffs=["researcher"],
    system_message="""You are a course planner.
    Receive a course request from the user, create a high-level course plan, and then delegate topic research to the researcher.
    Use TERMINATE when the course structure is ready."""
)

# Research Agent
research_agent = AssistantAgent(
    name="researcher",
    model_client=model_client,
    tools=[web_search],
    handoffs=["writer", "course_planner"],
    description="""You are a researcher.
    Your job is to research subtopics with web search.
    Once research is complete, handoff to the writer for content creation."""
)

# Content Writer Agent
content_writer = AssistantAgent(
    name="writer",
    model_client=model_client,
    handoffs=["validator"],
    system_message="""You are a content writer.
    Write clear, analogy-driven lesson content based on research.
    Handoff to the validator for review."""
)

# Validator Agent
content_validator = AssistantAgent(
    name="validator",
    model_client=model_client,
    tools=[web_search],
    handoffs=["quiz_master"],
    description="""You validate content for factual correctness and safety.
    Search the web to verify claims.
    If content is valid, handoff to quiz_master."""
)

# Quiz Master Agent
quiz_master = AssistantAgent(
    name="quiz_master",
    model_client=model_client,
    handoffs=["critique"],
    system_message="""You create a quiz based on lesson content.
    When complete, handoff to critique for quality review."""
)

# Critique Agent
critique_agent = AssistantAgent(
    name="critique",
    model_client=model_client,
    handoffs=["assembler"],
    system_message="""You provide feedback on lesson clarity, pacing, and quiz alignment with user preferences.
    When done, handoff to the course assembler."""
)

# Course Assembler Agent
course_assembler = AssistantAgent(
    name="assembler",
    model_client=model_client,
    handoffs=["user"],
    system_message="""You package the lesson and quiz into a final course module.
    When done, handoff to the user with the final output.
    Use TERMINATE after final handoff."""
)