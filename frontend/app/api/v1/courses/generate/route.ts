import { mockData } from "@/constants/common";
import { courses, modules, activities, lessons } from "@/drizzle/schema";
import { GenerateCourseRequest } from "@/types/GenerateCourseRequest";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { IMetadata } from "@/interfaces/IMetadata";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const requestBody: GenerateCourseRequest = await req.json();
    console.log(requestBody);

    // TODO: Use azure function
    const azureFunctionResponse = mockData.result;
    const metadata:IMetadata = {
      count: {  
        modules: 0,
        lessons: 0,
        activities: 0,
      }};

    // Insert course first
    const [insertedCourse] = await db
      .insert(courses)
      .values({
        topic: azureFunctionResponse.topic,
        description: azureFunctionResponse.description,
        preferences: requestBody.preferences,
        metadata: {},
      })
      .returning();

    // Insert modules with course reference
    azureFunctionResponse.modules.forEach(async (moduleData, moduleIndex) => {
      metadata.count.modules += 1;
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
        if (data.lesson_title) {
          metadata.count.lessons += 1;
          await db.insert(lessons).values({
            title: data.lesson_title,
            content: data.content,
            moduleId: insertedModule.moduleId,
            displayOrder: contentIndex + 1,
          });
        }
        // Check if it's an activity (QUIZ)
        else if (data.quiz_title) {
          metadata.count.activities += 1;
          await db.insert(activities).values({
            title: data.quiz_title,
            type: data.type,
            content: data.content,
            moduleId: insertedModule.moduleId,
            displayOrder: contentIndex + 1,
          });
        }
      });
    });

    // Update course metadata with the counts
    await db.update(courses).set({
      metadata: metadata,
    }).where(eq(courses.courseId, insertedCourse.courseId));

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
