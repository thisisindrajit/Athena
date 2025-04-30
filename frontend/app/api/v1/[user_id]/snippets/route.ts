import { db } from "@/db";
import { courses, userCourses } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
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
        topic: courses.topic,
        description: courses.description,
        preferences: courses.preferences,
        metadata: courses.metadata,
        createdAt: courses.createdAt,
        updatedAt: courses.updatedAt
      })
      .from(userCourses)
      .where(eq(userCourses.userId, user_id))
      .innerJoin(courses, eq(userCourses.courseId, courses.courseId));

    return Response.json(result);
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Error occurred while fetching user snippets: ${errorMessage}`,
      {
        status: 400,
      }
    );
  }
}
