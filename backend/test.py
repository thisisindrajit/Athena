import asyncio
import os
import dotenv
from typing import List
from autogen_core.model_context import UnboundedChatCompletionContext
from autogen_core.models import AssistantMessage, LLMMessage, ModelFamily
from autogen_core.tools import FunctionTool
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import (
    AzureOpenAIChatCompletionClient,
    OpenAIChatCompletionClient,
)
# from autogen_ext.models.azure import AzureAIChatCompletionClient
# from azure.core.credentials import AzureKeyCredential
from constants import AZURE_GPT_4O_MINI, AZURE_DEEPSEEK_R1

dotenv.load_dotenv()

gpt_model_client = AzureOpenAIChatCompletionClient(
    azure_deployment=AZURE_GPT_4O_MINI,
    model=AZURE_GPT_4O_MINI,
    api_version="2024-12-01-preview",
    azure_endpoint=os.getenv("AZURE_GPT_4O_MINI_ENDPOINT"),
    api_key=os.getenv("AZURE_GPT_4O_MINI_API_KEY"),
)

deepseek_model_info = {
    "vision": False,
    "function_calling": True,
    "json_output": False,
    "structured_output": False,
    "family": ModelFamily.R1,
}

deepseek_model_client = OpenAIChatCompletionClient(
    model=AZURE_DEEPSEEK_R1,
    base_url=os.getenv("AZURE_DEEPSEEK_R1_ENDPOINT"),
    api_key=os.getenv("AZURE_DEEPSEEK_R1_API_KEY"),
    model_info=deepseek_model_info,
)

# current_model_client = gpt_model_client
current_model_client = deepseek_model_client


class ReasoningModelContext(UnboundedChatCompletionContext):
    """A model context for reasoning models."""

    async def get_messages(self) -> List[LLMMessage]:
        messages = await super().get_messages()
        # Filter out thought field from AssistantMessage.
        messages_out: List[LLMMessage] = []
        for message in messages:
            if isinstance(message, AssistantMessage):
                message.thought = None
            messages_out.append(message)
        return messages_out


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
    system_message="You are a helpful assistant. Use the given tools to answer the user's questions if available.",
    reflect_on_tool_use=True,
    # model_client_stream=True,  # Enable streaming tokens from the model client. (THIS DOES NOT WORK FOR REASONING MODELS LIKE "DEEPSEEK R1" I PRESUME)
    model_context=ReasoningModelContext(),  # Use the custom model context.
)

# NOTE: DEEPSEEK R1 does not support function calling too :( 
# Reference: https://github.com/langchain-ai/langgraph/discussions/3304#discussioncomment-12057867

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
