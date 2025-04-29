import { GenerateCourseRequest } from "@/types/GenerateCourseRequest";
import { NextRequest } from "next/server";
import test from "node:test";

export async function POST(req: NextRequest) {
  try {
    const requestBody:GenerateCourseRequest = await req.json();
    console.log(requestBody);

    // TODO: Use azure function 
    const azureFunctionResponse = testData; // await fetch("https://<your-azure-function-url>", {

    // Store in DB 

    return Response.json(`Couse generated successfully for topic ${requestBody.topic}`, { status: 200 });
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Some error occurred while fetching courses: ${errorMessage}`,
      {
        status: 400,
      }
    );
  }
}


const testData = {
    "title": "string",
    "description": "string",
    "preferences": {
        "level": "BEGINNER",
        "duration": "SHORT",
        "focus": "IN-DEPTH"
    },
    "metadata": {
        "count": {
            "modules": 3,
            "lessons": 10,
            "activities": 5
        }
    },
    "modules": [
        {
            "module_id": "BIGINT",
            "title": "string",
            "description": "string",
            "content": [
                {
                    "lesson_id": "BIGINT",
                    "title": "string",
                    "description": "string",
                    "content": {
                        "type": "MARKDOWN",
                        "content": "<markdown>"
                    }
                },
                {
                    "activity_id": "BIGINT",
                    "title": "string",
                    "type": "<quiz>",
                    "content": {
                        "type": "MARKDOWN",
                        "content": "<markdown>"
                    }
                },
                {
                    "lesson_id": "BIGINT",
                    "title": "string",
                    "description": "string",
                    "content": {
                        "type": "MARKDOWN",
                        "content": "<markdown>"
                    }
                }
            ]
        }
    ]
}