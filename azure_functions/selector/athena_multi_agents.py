from autogen_agentchat.agents import AssistantAgent
from autogen_ext.agents.web_surfer import MultimodalWebSurfer
from common.models import o3_mini_model_client

model_client = o3_mini_model_client

preferences = """Preferences can have the following values: Level, Duration, Focus.
Example:
{
    level: "beginner" | "intermediate" | "advanced";
    duration: "short" | "medium" | "long";
    focus: "broad" | "in-depth";
}
Level: Beginner implies no prior knowledge, Intermediate implies some knowledge, Advanced implies deep knowledge.
Duration: Short implies 1-2 hours, Medium implies 3-5 hours, Long implies 6+ hours.
Focus: Broad implies covering many topics, In-depth implies covering fewer topics in extreme detail.
"""

course_planner_json = """{
The number of modules can be decided based on the preferences.
Example JSON:
{
    topic: "<Topic>",
    description: "<Description with course overview and objectives on what the user will learn>",
    modules: [
        {
            title: "<Module Title>",
            description: "<Module Description in 3-5 sentences in MARKDOWN format with bullet points or paragraph>"
        },
        {
            title: "<Module Title>",
            description: "<Module Description in 3-5 sentences in MARKDOWN format with bullet points or paragraph>"
        }
    ]
}"""

module_researcher_json = """{
Every module should be having a content array with lessons and quizzes. Based on the preferences, the number of lessons and quizzes can be decided.
The course_planner_json should be enhanced with the module_researcher_json for every module.
Example JSON:
{
    title: "<Module Title provided by the course_planner>",
    description: "<Module Description provided by course_planner. Improvise if needed in MARKDOWN format>",
    content: [
        {
            lesson_title: "<Lesson Title>",
        },
        {
            lesson_title: "<Lesson Title>",
        },
        {
            quiz_title: "<Quiz Title>",
        },
        {
            quiz_title: "<Quiz Title>",
        }
    ]
}
"""


lesson_writer_json = """{
Every lesson should be having detailed content. Based on the preferences, the content value length can be decided. 
But it should be in MARKDOWN format and must have headings, subheadings, bullet points, examples, code snippets, analogies, tables.
In the end also include a subheading with Key Takeaways, summary of the lesson and provide the references as hyperlinks.
The below json should be used to enhance the module_researcher_json for every lesson.
Example JSON:
{
    lesson_title: "<Lesson Title provided by the module_researcher>",
    content: {
        type: "MARKDOWN",
        value: "<Lesson Content in MARKDOWN format. It should be in 3-5 paragraphs with bullet points or tables>"
    }
}
"""

quiz_maker_json = """
The difficulty level of the quiz can be decided based on the preferences.
The quizes should be testing the understanding of the lesson content. If needed, make the quiz more analytical and critical.
Based on the quiz title and the lesson content in the module, create a quiz with multiple-choice, true/false questions.
The below json should be used to enhance the module_researcher_json for every quiz.
The type value in the JSON should be always "quiz".
Example JSON:
[
    {
        quiz_title: "<Quiz Title provided by the module_researcher>",
        type: "quiz",
        content: {
            question: "<This is a question for the multiple-choice quiz>",
            options: [<Option 1>, <Option 2>, <Option 3>, <Option 4>],
            answer: "<Option number 1-4>"
        }
    },
    {
        quiz_title: "<Quiz Title provided by the module_researcher>",
        type: "quiz",
        content: {
            question: "<This is a question for true/false quiz>",
            options: [True, False],
            answer: "<Option number 1-2>"
    }
]
"""


course_assembler_json = """{
The final course JSON should be a combination of all the modules and lessons and quizzes under each module.
The JSON should be well-structured and validated.
The final course JSON should be in the same format as the course_planner_json but with all the modules and lessons and quizzes under each module under the content array.
Example JSON:
{
    topic: "<Topic from course_planner>",
    description: "<Description from course_planner>",
    modules: [
        {
            title: "<Module Title>",
            description: "<Module Description>"
            content: [
                {
                    lesson_title: "<Lesson Title>",
                    content: {
                        type: "MARKDOWN",
                        value: "<Lesson Content from lesson_writer>"
                    }
                },
                {
                    lesson_title: "<Lesson Title>",
                    content: {
                        type: "MARKDOWN",
                        value: "<Lesson Content from lesson_writer>"
                    }
                },
                {
                    quiz_title: "<Quiz Title>",
                    type: "quiz",
                    content: {
                        question: "<Quiz question from quiz_maker>",
                        options: [<Option 1>, <Option 2>, <Option 3>, <Option 4>],
                        answer: "<Option number 1-4>"
                    }
                },
                {
                    quiz_title: "<Quiz Title>",
                    type: "quiz",
                    content: {
                        question: "<Quiz question from quiz_maker>",
                        options: [True, False],
                        answer: "<Option number 1-2>"
                }
            ]
        },
        {
            title: "<Module Title>",
            description: "<Module Description>"
            content: [
                {
                    lesson_title: "<Lesson Title>",
                    content: {
                        type: "MARKDOWN",
                        value: "<Lesson Content from lesson_writer>"
                    }
                },
                {
                    lesson_title: "<Lesson Title>",
                    content: {
                        type: "MARKDOWN",
                        value: "<Lesson Content from lesson_writer>"
                    }
                },
                {
                    quiz_title: "<Quiz Title>",
                    type: "quiz",
                    content: {
                        question: "<Quiz question from quiz_maker>",
                        options: [<Option 1>, <Option 2>, <Option 3>, <Option 4>],
                        answer: "<Option number 1-4>"
                    }
                },
                {
                    quiz_title: "<Quiz Title>",
                    type: "quiz",
                    content: {
                        question: "<Quiz question from quiz_maker>",
                        options: [True, False],
                        answer: "<Option number 1-2>"
                }
            ]
        }
    ]
}"""


# Course Planner Agent
course_planner = AssistantAgent(
    name="course_planner",
    model_client=model_client,
    system_message=f"""You are a Course Planner.
    Take the user's topic and preferences based on this format:
    {preferences}
    Create a full course structure with multiple modules following this format:
    {course_planner_json}
    After completing the course plan with modules, hand off each module to the Module Researcher.""",
)



# Module Research Agent (Uses Web)
module_researcher = AssistantAgent(
    name="module_researcher",
    model_client=model_client,
    system_message=f"""You are a Module Researcher.
    Research the given module topic using the web and internet. 
    Find accurate and up-to-date key concepts and information on the module topic.
    Create a module content with lessons and quizzes following this format:
    {module_researcher_json}
    After completing module research, handoff to the Lesson Writer.""",
)

# Lesson Content Writer Agent
lesson_writer = AssistantAgent(
    name="lesson_writer",
    model_client=model_client,
    system_message=f"""You are a Lesson Writer.
    Write detailed lesson for every lesson under the module using the web and internet.
    {lesson_writer_json}
    After the lesson is written, handoff to Quiz Maker.""",
)

# Quiz Maker Agent
quiz_maker = AssistantAgent(
    name="quiz_maker",
    model_client=model_client,
    system_message=f"""You are a Quiz Maker.
    Based on the lesson content, create quizzes. 
    {quiz_maker_json}
    After quizzes are generated, handoff to Course Assembler.""",
)

# # Content Validator Agent (Uses Web)
# content_validator = MultimodalWebSurfer(
#     name="content_validator",
#     model_client=model_client,
#     description="""You are a Content Validator.
#     Fact-check lesson and quiz content using the web.
#     Check for factual inaccuracies, bias, or unsafe content.
#     Approve if correct, or raise specific issues.
#     After validation, handoff to Critique Agent.""",
# )

# # Critique Agent
# critique_agent = AssistantAgent(
#     name="critique_agent",
#     model_client=model_client,
#     system_message="""You are a Critique Agent.
#     Analyze validated content for clarity, engagement, pacing, and adherence to user preferences.
#     Provide strengths and constructive improvements.
#     After critique, handoff to Course Assembler.""",
# )

# Course Assembler Agent
course_assembler = AssistantAgent(
    name="course_assembler",
    model_client=model_client,
    system_message=f"""You are a Course Assembler.
    Collect all the modules, the respective lessons and quizzes under each module.
    Assemble them into a final, structured course json.
    {course_assembler_json}
    After assembling the course into a single JSON, print TERMINATE as last message."""
)