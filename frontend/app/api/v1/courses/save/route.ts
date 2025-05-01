import { NextRequest } from "next/server";
import { saveCourseToDatabase, saveCourseToFile, saveToUserCourses } from "./saveHelperFunc";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        // payload is a JSON object
        // Parse the responseJson and requestBody from the payload
        const responseJson = JSON.parse(payload.responseJson);
        const requestBody = JSON.parse(payload.requestBody);

        console.log("Received request to save course: ", requestBody.topic);

        // await saveCourseToFile(responseJson);
        const { courseMetadata, courseId } = await saveCourseToDatabase(responseJson, requestBody);
        await saveToUserCourses(courseId, requestBody.userId);

        console.log("Course saved successfully: ", courseId);

        return Response.json(
            { message: `Course saved successfully for topic ${requestBody.topic} with courseId ${courseId} metadata ${JSON.stringify(courseMetadata)}` },
            { status: 200 }
        );
    }
    catch (err: Error | unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("Error occurred while saving course: ", errorMessage);
        return Response.json(
            { error: `Error occurred while saving course: ${errorMessage}`},
            { status: 400 }
        );
    }
}