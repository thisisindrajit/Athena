import azure.functions as func
from autogen_agentchat.messages import TextMessage
import logging
from selector.team_selector import team

app = func.FunctionApp()

@app.route(route="generate_course")
async def generate_course(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    query = req.params.get('query')
    if not query:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            query = req_body.get('query')

    logging.info(f"Query: {query}")

    try:
        if query:
            result = ""
            async for message in team.run_stream(task=query):
                if isinstance(message, TextMessage) and message.source == "course_assembler":
                    result += str(message.content)
            
            # Store the final course content
            # store_final_course(result)
            # data = await run_team_selector(query)
            return func.HttpResponse(f"Result: {result}", status_code=200)
        else:
            return func.HttpResponse(
                "This HTTP triggered function executed successfully. Pass a query in the query string or in the request body for a personalized response.",
                status_code=400
        )
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return func.HttpResponse(
            f"An error occurred: {e}",
            status_code=500
        )