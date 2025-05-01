from autogen_agentchat.conditions import HandoffTermination, TextMentionTermination
from typing import List
from autogen_agentchat.messages import TextMessage
from datetime import datetime
import requests
import os
import json

termination_condition = HandoffTermination(target="user") | TextMentionTermination("TERMINATE_COURSE_ASSEMBLER")

def get_final_course(messages: List[TextMessage]) -> str:
    for message in reversed(messages):
        if message.source == "course_assembler":
            return message.content
    return ""


def store_final_course(final_course_content: str) -> None:
    # Remove the termination condition text from the final course content
    final_course_content = final_course_content.replace("TERMINATE_COURSE_ASSEMBLER", "").strip()

    # Create a timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # Save to Markdown with timestamped filename
    filename = f"final_course_{timestamp}.md"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(final_course_content)

    print(f"✅ Final course saved as {filename}")

async def save_course_to_db(result, query) -> None:
    # CALLBACK: Store the final course content
    url = os.environ.get("ATHENA_URL") + "/api/v1/courses/save"
    headers = {'Content-type': 'application/json'}
    
    # Result is already a string, so no need to json.dumps
    json_data = {"responseJson": result, "requestBody": json.dumps(query)}
    
    response = requests.post(url, json=json_data, headers=headers)
    print("✅ Final course content stored in database: ", response)
