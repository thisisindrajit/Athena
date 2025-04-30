import { db } from "@/db";
import { courses, modules } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const result = await db.select({
      courseId: courses.courseId,
      courseTopic: courses.topic,
      moduleId: modules.moduleId,
      moduleTitle: modules.title,
      moduleDescription: modules.description,
      preferences: courses.preferences
    }).from(modules).innerJoin(courses, eq(modules.courseId, courses.courseId)).orderBy(desc(courses.createdAt)).limit(5);

    return Response.json(result);
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Error occurred while fetching trending modules: ${errorMessage}`,
      {
        status: 400,
      }
    );
  }
}
