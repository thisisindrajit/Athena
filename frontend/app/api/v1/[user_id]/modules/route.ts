import { db } from "@/db";
import { courses, userCourses, modules } from "@/drizzle/schema";
import { desc, eq, lt } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;

    const result = await db
      .select({
        courseId: courses.courseId,
        courseTopic: courses.topic,
        moduleId: modules.moduleId,
        moduleTitle: modules.title,
        moduleDescription: modules.description,
        preferences: courses.preferences
      })
      .from(userCourses)
      .where(eq(userCourses.userId, user_id))
      .innerJoin(modules, eq(modules.courseId, userCourses.courseId))
      .innerJoin(courses, eq(courses.courseId, userCourses.courseId))
      .groupBy(courses.courseId, courses.topic, modules.moduleId, modules.title, modules.description, courses.preferences, modules.moduleOrder, modules.createdAt)
      .having(lt(modules.moduleOrder, 4)) // Assuming you want to limit to the first 3 modules
      .orderBy(desc(modules.createdAt)).limit(10);

    return Response.json(result);
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Error occurred while fetching user modules: ${errorMessage}`,
      {
        status: 400,
      }
    );
  }
}
