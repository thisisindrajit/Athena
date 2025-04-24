import azure.functions as func
import logging
import asyncio
import os
import dotenv
from autogen_core.tools import FunctionTool
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import AzureOpenAIChatCompletionClient
from constants import AZURE_GPT_4O_MINI, AZURE_O3_MINI

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.route(route="athena_backend_az_function")
def athena_backend_az_function(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

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

    current_model_client = gpt_4o_model_client
    # current_model_client = o3_mini_model_client


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
    async def main(task: str) -> str:
        try:
            console = Console(
                agent.run_stream(task=task)
            )
            full_response = ""
            async for item in console.output_stream:
                full_response += item.content or ""
            return full_response
        finally:
            # Ensure the client session is closed properly
            await current_model_client.close()

    # Get the question from the request
    question = req.params.get('question')
    if not question:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            question = req_body.get('question')

    if question:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(main(task=question))
        loop.close()
        return func.HttpResponse(result, mimetype="text/plain")
    else:
        return func.HttpResponse(
             "Please pass a question in the query string or in the request body",
             status_code=400
        )