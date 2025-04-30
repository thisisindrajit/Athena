# Autogen Function App

This project is an Azure Function App that integrates with Bing Search and Azure OpenAI services to provide enriched search results and generate reports based on those results.

## Prerequisites

- Python 3.9.12 or later
- Azure Functions Core Tools
- Azure Subscription
- Bing Search API Key
- Azure OpenAI API Key

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/agents-on-function-app.git
    cd agents-on-function-app
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv .venv
    .venv\Scripts\activate  # On Windows
    source .venv/bin/activate  # On macOS/Linux
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Set up your local settings:
    - Create a [local.settings.json](http://_vscodecontentref_/0) file in the root directory with the following content:
    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "python",
            "BING_SEARCH_API_KEY": "your-bing-search-api-key",
            "AZURE_OPENAI_API_KEY": "your-azure-openai-api-key"
        }
    }
    ```

## Running the Function App

1. Start the Azure Functions runtime:
    ```sh
    func start
    ```

2. The function app should now be running locally. You can test it by sending HTTP requests to the endpoint.

## Project Structure

- [function_app.py](http://_vscodecontentref_/1): Main function app code.
- [.gitignore](http://_vscodecontentref_/2): Git ignore file to exclude unnecessary files from the repository.
- [requirements.txt](http://_vscodecontentref_/3): Python dependencies for the project.

## Usage

- The function app exposes an HTTP endpoint that can be triggered with a `name` parameter.
- The app uses Bing Search API to fetch search results and Azure OpenAI to generate reports based on those results.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.