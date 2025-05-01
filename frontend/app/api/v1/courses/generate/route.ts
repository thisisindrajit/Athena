import { TGenerateCourseRequest } from "@/types/TGenerateCourseRequest";
import { NextRequest } from "next/server";
import { callAzureFunction } from "@/queries/callAzureFunction";

export async function POST(req: NextRequest) {
  try {
    const requestBody: TGenerateCourseRequest = await req.json();
    console.log("TGenerateCourseRequest: ", requestBody);

    if (!requestBody.userId || !requestBody.topic) {
      return Response.json({ error: "userId and topic are required fields" }, { status: 400 });
    }
    
    await callAzureFunction(requestBody);

    return Response.json(
      {
        message: `Azure function called successfully for topic ${
          requestBody.topic
        }`
      },
      { status: 200 }
    );

  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return Response.json(
      {
        error: `Error occurred while calling azure function: ${errorMessage}`,
      },
      {
        status: 400,
      }
    );
  }
}

