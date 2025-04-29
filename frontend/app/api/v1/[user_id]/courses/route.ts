import { db } from '@/db';
import { courses, userCourses } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest } from 'next';

export async function GET(
  req: NextApiRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;
    const result = await db.select({ courses: courses })
      .from(userCourses)
      .where(eq(userCourses.userId, user_id))
      .innerJoin(courses, eq(userCourses.courseId, courses.courseId));
    return Response.json(result);
  } catch (err: Error | any) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Error occurred while fetching courses: ${errorMessage}`,
      {
        status: 400,
      });
  }
}

