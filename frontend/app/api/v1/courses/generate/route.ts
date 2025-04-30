import { mockData } from "@/constants/common";
import { courses, modules, activities, lessons } from "@/drizzle/schema";
import { GenerateCourseRequest } from "@/types/GenerateCourseRequest";
import { NextRequest } from "next/server";
import { db } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const requestBody: GenerateCourseRequest = await req.json();
    console.log(requestBody);

    // TODO: Use azure function
    const azureFunctionResponse = mockData;

    // Insert course first
    const [insertedCourse] = await db
      .insert(courses)
      .values({
        topic: azureFunctionResponse.topic,
        description: azureFunctionResponse.description,
        preferences: azureFunctionResponse.preferences,
        metadata: azureFunctionResponse.metadata,
      })
      .returning();

    // Insert modules with course reference
    azureFunctionResponse.modules.forEach(async (moduleData, moduleIndex) => {
      const [insertedModule] = await db
        .insert(modules)
        .values({
          courseId: insertedCourse.courseId,
          title: moduleData.title,
          description: moduleData.description,
          metadata: {},
          moduleOrder: moduleIndex + 1,
        })
        .returning();

      moduleData.content.forEach(async (data, contentIndex) => {
        // Check if it's a lesson
        if (data.lesson_id) {
          await db.insert(lessons).values({
            title: data.title,
            content: data.content,
            moduleId: insertedModule.moduleId,
            displayOrder: contentIndex + 1,
          });
        }
        // Check if it's an activity
        else if (data.activity_id) {
          await db.insert(activities).values({
            title: data.title,
            type: data.type,
            content: data.content,
            moduleId: insertedModule.moduleId,
            displayOrder: contentIndex + 1,
          });
        }
      });
    });

    return Response.json(
      `Couse generated successfully for topic ${requestBody.topic}`,
      { status: 200 }
    );
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Some error occurred while generating course: ${errorMessage}`,
      {
        status: 400,
      }
    );
  }
}
