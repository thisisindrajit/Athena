import { NextRequest } from "next/server";
import { saveCourseToDatabase, saveCourseToFile, saveToUserCourses } from "./saveHelperFunc";

export async function POST(req: NextRequest) {
    const payload = await req.json();

    console.log("Received request to save course: ", payload.requestBody.topic);

    // await saveCourseToFile(payload.responseJson);
    const { courseMetadata, courseId } = await saveCourseToDatabase(payload.reponseJson, payload.requestBody);
    await saveToUserCourses(courseId, payload.requestBody.userId);

    console.log(`Course generated successfully for topic ${payload.requestBody.topic} with courseId ${courseId} metadata ${JSON.stringify(courseMetadata)}`);
}