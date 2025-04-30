from autogen_agentchat.conditions import HandoffTermination, TextMentionTermination
from typing import List
from autogen_agentchat.messages import TextMessage
from datetime import datetime

termination_condition = HandoffTermination(target="user") | TextMentionTermination("TERMINATE")

def get_final_course(messages: List[TextMessage]) -> str:
    for message in reversed(messages):
        if message.source == "course_assembler":
            return message.content
    return ""


def store_final_course(final_course_content: str) -> None:
    # Create a timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # Save to Markdown with timestamped filename
    filename = f"final_course_{timestamp}.md"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(final_course_content)

    print(f"✅ Final course saved as {filename}")