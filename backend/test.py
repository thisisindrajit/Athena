import asyncio
import os
import dotenv
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import AzureOpenAIChatCompletionClient
from autogen_ext.models.azure import AzureAIChatCompletionClient
from azure.ai.inference import ChatCompletionsClient
from azure.core.credentials import AzureKeyCredential
from constants import AZURE_GPT_4O_MINI, AZURE_DEEPSEEK_V3


dotenv.load_dotenv()

gpt_model_client = AzureOpenAIChatCompletionClient(
    azure_deployment=AZURE_GPT_4O_MINI,
    model=AZURE_GPT_4O_MINI,
    api_version="2024-12-01-preview",
    azure_endpoint=os.getenv('AZURE_GPT_4O_MINI_ENDPOINT'),
    api_key=os.getenv('AZURE_GPT_4O_MINI_API_KEY')
)

deepseek_model_info = {
    "json_output": True,
    "function_calling": True,
    "vision": False,
    "family": "unknown",
    "structured_output": False,
}

# deepseek_model_client = AzureOpenAIChatCompletionClient(
#     model=AZURE_DEEPSEEK_V3,
#     model_info=deepseek_model_info,
#     api_version="2024-05-01-preview",
#     azure_endpoint=os.getenv('AZURE_DEEPSEEK_V3_ENDPOINT'),
#     api_key=os.getenv('AZURE_DEEPSEEK_V3_API_KEY')
# )
deepseek_model_client= AzureAIChatCompletionClient(
    model=AZURE_DEEPSEEK_V3,
    endpoint=os.getenv('AZURE_DEEPSEEK_V3_ENDPOINT'),
    credential=AzureKeyCredential(os.getenv('AZURE_DEEPSEEK_V3_API_KEY')),
    model_info=deepseek_model_info,
    stop="unknown"
)


current_model_client = gpt_model_client
# current_model_client = deepseek_model_client

# Define a simple function tool that the agent can use.
# For this example, we use a fake weather tool for demonstration purposes.
async def get_weather(city: str) -> str:
    """Get the weather for a given city."""
    return f"The weather in {city} is 73 degrees and Sunny."
    


# Define an AssistantAgent with the model, tool, system message, and reflection enabled.
# The system message instructs the agent via natural language.
agent = AssistantAgent(
    name="weather_agent",
    model_client=current_model_client,
    tools=[get_weather],
    system_message="You are a helpful assistant.",
    reflect_on_tool_use=True,
    model_client_stream=True,  # Enable streaming tokens from the model client.
)


# Run the agent and stream the messages to the console.
async def main() -> None:
    try:
        await Console(agent.run_stream(task="What is the weather in New York?"))
    finally:
        # Ensure the client session is closed properly
        await current_model_client.close()


# NOTE: if running this inside a Python script you'll need to use asyncio.run(main()).
asyncio.run(main())