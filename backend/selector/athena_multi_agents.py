from autogen_agentchat.agents import AssistantAgent
from autogen_ext.agents.web_surfer import MultimodalWebSurfer
from common.models import o3_mini_model_client

model_client = o3_mini_model_client

# Course Planner Agent
course_planner = AssistantAgent(
    name="course_planner",
    model_client=model_client,
    system_message="""You are a Course Planner.
    Take the user's topic and preferences.
    Break it into a full course structure with multiple modules and lessons.
    Output JSON with modules and lessons list.
    After completing the course plan, hand off to the Research Agent.""",
)

# Then pass each module to the Research Agent.

# Module Research Agent (Uses Web)
module_researcher = MultimodalWebSurfer(
    name="module_researcher",
    model_client=model_client,
    description="""You are a Research Agent.
    Research the given module topics using the web.
    Find accurate and up-to-date key concepts and information.
    Output a structured bullet-point list.
    After completing research, handoff to the Lesson Content Writer.""",
)

# Lesson Content Writer Agent
lesson_writer = AssistantAgent(
    name="lesson_writer",
    model_client=model_client,
    system_message="""You are a Lesson Content Writer.
    Write detailed lesson for every lesson under the module using the web.
    Respect the user's preferences (style, pacing, analogies).
    Output as well-formatted Markdown text.
    After the lesson is written, handoff to Content Validator.""",
)

# Quiz Maker Agent
quiz_maker = AssistantAgent(
    name="quiz_maker",
    model_client=model_client,
    system_message="""You are a Quiz Maker.
    Create quizzes based on the lesson content.
    Include multiple-choice, true/false, and short answer questions.
    After quizzes, handoff to Content Validator.""",
)

# Content Validator Agent (Uses Web)
content_validator = MultimodalWebSurfer(
    name="content_validator",
    model_client=model_client,
    description="""You are a Content Validator.
    Fact-check lesson and quiz content using the web.
    Check for factual inaccuracies, bias, or unsafe content.
    Approve if correct, or raise specific issues.
    After validation, handoff to Critique Agent.""",
)

# Critique Agent
critique_agent = AssistantAgent(
    name="critique_agent",
    model_client=model_client,
    system_message="""You are a Critique Agent.
    Analyze validated content for clarity, engagement, pacing, and adherence to user preferences.
    Provide strengths and constructive improvements.
    After critique, handoff to Course Assembler.""",
)

# Course Assembler Agent
course_assembler = AssistantAgent(
    name="course_assembler",
    model_client=model_client,
    system_message="""You are a Course Assembler.
    Collect all validated lessons and quizzes.
    Assemble them into a final, structured course document.
    Output as single JSON.
    When complete, print TERMINATE as last message.""",
)