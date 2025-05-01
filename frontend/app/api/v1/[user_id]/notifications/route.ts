import { ITEMS_LIMIT } from "@/constants/common";
import { db } from "@/db";
import { courses, userCourses } from "@/drizzle/schema";
import { and, desc, eq } from "drizzle-orm";
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
        metadata: courses.metadata,
        createdAt: courses.createdAt,
      })
      .from(userCourses)
      .where(
        and(
          eq(userCourses.userId, user_id),
          eq(userCourses.isNotificationReceived, 1)
        )
      )
      .innerJoin(courses, eq(userCourses.courseId, courses.courseId))
      .orderBy(desc(userCourses.enrolledAt))
      .limit(ITEMS_LIMIT);

    return Response.json(result);
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Error occurred while fetching user courses: ${errorMessage}`,
      {
        status: 400,
      }
    );
  }
}
