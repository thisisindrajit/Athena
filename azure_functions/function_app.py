import azure.functions as func
from autogen_agentchat.messages import TextMessage
import logging
from common.helper import save_course_to_db
from selector.team_selector import team
import json

app = func.FunctionApp()

@app.route(route="generate_course")
async def generate_course(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Python HTTP trigger function processed a request.")

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        query = req_body.get("query")

    logging.info(f"Query: {query}")

    if not query:
        return func.HttpResponse(
            json.dumps({
                "message": "This HTTP triggered function executed successfully. Pass a query with preferences in the request body for a personalized response."
            }),
            mimetype="application/json", 
            status_code=400,
        )

    try:  
        result = await generate_course(query)

        # Store the final course to database
        save_course_to_db(result, query)

        # Store the final course content
        # store_final_course(result)

        return func.HttpResponse(
            body=json.dumps({"message": "Course content stored successfully"}),
            status_code=200
        )
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return func.HttpResponse(json.dumps({
                    "error": e
                }), status_code=500)


async def generate_course(query):
    """
    Function to generate a course based on the provided query.
    This function is called by the Azure Function App.
    """
    try:
        preferences_str = ", ".join(
            [f"{k}: {v}" for k, v in query["preferences"].items()]
        )
        queryString = f"Create a course on topic: {query['topic']} with the following preferences: {preferences_str}"
        logging.info(f"Formatted Query: {queryString}")
        result = ""
        async for message in team.run_stream(task=queryString):
            if isinstance(message, TextMessage) and message.source == "course_assembler":
                result += str(message.content)

        logging.info(f"Final Course Content generated successfully")
        result = result.replace("TERMINATE_COURSE_ASSEMBLER", "").strip()

        # Store the final course content
        # store_final_course(result)
        return result
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return None