# Athena

Athena is an AI-powered application designed to revolutionize learning by automatically generating personalized educational courses. Users simply provide a high-level topic they wish to learn (e.g. "Quantum Physics", "Introduction to Python", "History of the Silk Road") and specify their learning preferences (such as desired level, duration or focus). Athena then leverages a sophisticated multi-agent AI system to research the topic, structure a comprehensive course syllabus, write explanatory content, and generate interactive learning materials like quizzes, all tailored to the individual user's needs.

Athena - Where Knowledge is Crafted for You.

## Problem Statement

Traditional learning resources, whether textbooks, online courses, or tutorials, often adopt a "one-size-fits-all" approach. This fails to cater to the diverse needs of learners who have different backgrounds, goals, learning speeds, and preferences for how information is presented. Key challenges include:

1.  **Lack of Personalization:** Standard materials don't adapt to individual learning paces (too short or too long), desired focus (broad vs. deep dive), or preferred level (beginner vs. advanced).
2.  **Information Overload & Structure:** Learners often struggle to find reliable resources and structure them into a logical learning path, especially for complex topics.
3.  **Passive Learning:** Many resources lack integrated active learning components like quizzes or exercises, which are crucial for knowledge retention and understanding.
4.  **Time Consuming:** Manually curating a personalized learning plan and materials takes significant time and effort.

## Proposed Solution

Athena addresses these challenges by employing a collaborative multi-agent system built using the **AutoGen framework**. This system intelligently automates the course creation process:

1.  **Understanding Needs:** Athena takes the user's topic and learning preferences as input.
2.  **Intelligent Planning & Research:** A `CoursePlannerAgent` designs a logical course structure (modules, lessons). A `ResearchAgent`, equipped with web-search capabilities, gathers relevant and up-to-date information for each section.
3.  **Tailored Content Generation:** A `ContentWriterAgent` synthesizes the researched information and crafts explanations, examples, and analogies specifically tailored to the user's stated preferences (level, duration, focus).
4.  **Quality Assurance:** A `ContentValidatorAgent` checks the generated content for factual accuracy and appropriateness. A `CritiqueAgent` evaluates the content and quizzes against pedagogical principles and user preferences, ensuring clarity, engagement, and relevance.
5.  **Active Learning Integration:** An `ActivityAgent` generates creates quizzes, true/false, fill in the blanks, reorder and other kinds of active learning activities based on the validated content to reinforce learning.
6.  **Course Assembly:** The agents collaborate to assemble these components into a cohesive, structured, and personalized course ready for the user.

By automating and personalizing course creation, Athena provides a dynamic, efficient, and effective learning experience tailored to the individual.

## Key Features

* **Personalized Course Generation:** Creates courses based on any user-specified topic and learning preferences (level, duration, focus).
* **Dynamic Content Creation:** AI agents write unique explanations, examples, and analogies.
* **Active Learning Integration:** Automatically generates quizzes and other exercises related to the content.
* **Multi-Agent Architecture:** Utilizes AutoGen to orchestrate specialized AI agents (Planner, Researcher, Writer, Validator, Critic, Activity, Snippet).
* **Built-in Quality Control:** Includes agents dedicated to validating factual accuracy and critiquing pedagogical quality.
* **Adaptable Knowledge Base:** Leverages LLMs and web search tools to cover a vast range of topics.

## Architecture Overview

Athena employs a collaborative AutoGen workflow:

1.  **User Input:** `UserProxyAgent` collects topic and preferences.
2.  **Planning:** `CoursePlannerAgent` outlines the course structure.
3.  **Research:** `ResearchAgent` gathers information using web search tools.
4.  **Writing:** `ContentWriterAgent` drafts lesson content tailored to preferences.
5.  **Validation:** `ContentValidatorAgent` checks content accuracy.
6.  **Activity Gen:** `ActivityAgent` creates quizzes, true/false, fill in the blanks, reorder and other kinds of active learning activities based on validated content.
7.  **Snippet Gen:** `SnippetAgent` creates concise summaries of each module, distilling key points into bite-sized overviews that capture the essence of the module content.
8.  **Critique:** `CritiqueAgent` reviews content and quiz quality against preferences.
9.  **Iteration/Assembly:** `CoursePlannerAgent` manages revisions (if needed) and assembles the final course.
10. **Output:** `UserProxyAgent` presents the final course.

---

**Project created for the [Github AI Agents hackathon](https://microsoft.github.io/AI_Agents_Hackathon/)**