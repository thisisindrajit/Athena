import { NextRequest } from "next/server";
import { saveCourseToDatabase, saveCourseToFile, saveToUserCourses } from "./saveHelperFunc";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        console.log("Received request to save course: ", payload.requestBody.topic);

        // await saveCourseToFile(payload.responseJson);
        const { courseMetadata, courseId } = await saveCourseToDatabase(payload.responseJson, payload.requestBody);
        await saveToUserCourses(courseId, payload.requestBody.userId);

        return Response.json(
            { message: `Course save successfully for topic ${payload.requestBody.topic} with courseId ${courseId} metadata ${JSON.stringify(courseMetadata)}` },
            { status: 200 }
        );
    }
    catch (err: Error | unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);

        return Response.json(
            { error: `Error occurred while saving course: ${errorMessage}`},
            { status: 400 }
        );
    }
}