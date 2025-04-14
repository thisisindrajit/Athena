import asyncio
import os
import dotenv
from autogen_core.tools import FunctionTool
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import AzureOpenAIChatCompletionClient
from constants import AZURE_GPT_4O_MINI, AZURE_O3_MINI

dotenv.load_dotenv()

gpt_4o_model_client = AzureOpenAIChatCompletionClient(
    azure_deployment=AZURE_GPT_4O_MINI,
    model=AZURE_GPT_4O_MINI,
    api_version="2024-12-01-preview",
    azure_endpoint=os.getenv("AZURE_GPT_4O_MINI_ENDPOINT"),
    api_key=os.getenv("AZURE_GPT_4O_MINI_API_KEY"),
)

o3_mini_model_client = AzureOpenAIChatCompletionClient(
    azure_deployment=AZURE_O3_MINI,
    model=AZURE_O3_MINI,
    api_version="2024-12-01-preview",
    azure_endpoint=os.getenv("AZURE_O3_MINI_ENDPOINT"),
    api_key=os.getenv("AZURE_O3_MINI_API_KEY"),
)

# current_model_client = gpt_4o_model_client
current_model_client = o3_mini_model_client


# Define a simple function tool that the agent can use.
# For this example, we use a fake weather tool for demonstration purposes.
async def get_weather(city: str) -> str:
    """Get the weather for a given city."""
    return f"The weather in {city} is 73 degrees and Sunny."


weather_tool = FunctionTool(get_weather, description="Search weather for a location")

# Define an AssistantAgent with the model, tool, system message, and reflection enabled.
# The system message instructs the agent via natural language.
agent = AssistantAgent(
    name="assistant_agent",
    model_client=current_model_client,
    tools=[weather_tool],
    system_message="You are a helpful assistant.",
    reflect_on_tool_use=True,
    model_client_stream=True,  # Enable streaming tokens from the model client.
)


# Run the agent and stream the messages to the console.
async def main() -> None:
    try:
        await Console(
            agent.run_stream(task="What is the weather like today in New York?")
        )
    finally:
        # Ensure the client session is closed properly
        await current_model_client.close()


# NOTE: if running this inside a Python script you'll need to use asyncio.run(main()).
asyncio.run(main())
