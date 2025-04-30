import os
from autogen_ext.models.openai import AzureOpenAIChatCompletionClient
from common.constants import AZURE_GPT_4O_MINI, AZURE_O3_MINI
from dotenv import load_dotenv

load_dotenv()
gpt_4o_model_client = AzureOpenAIChatCompletionClient(
    azure_deployment=AZURE_GPT_4O_MINI,
    model=AZURE_GPT_4O_MINI,
    api_version="2024-12-01-preview",
    azure_endpoint=os.environ.get("AZURE_GPT_4O_MINI_ENDPOINT"),
    api_key=os.environ.get("AZURE_GPT_4O_MINI_API_KEY"),
)

o3_mini_model_client = AzureOpenAIChatCompletionClient(
    azure_deployment=AZURE_O3_MINI,
    model=AZURE_O3_MINI,
    api_version="2024-12-01-preview",
    azure_endpoint=os.environ.get("AZURE_O3_MINI_ENDPOINT"),
    api_key=os.environ.get("AZURE_O3_MINI_API_KEY"),
)
