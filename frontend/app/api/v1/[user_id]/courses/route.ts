import { db } from '@/db';
import { courses, userCourses } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest } from 'next';

export async function GET (
    req: NextApiRequest,  
    { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;
    const result = await db.select({courses: courses})
                        .from(courses)
                        .innerJoin(userCourses, eq(userCourses.courseId, courses.courseId))
                        .where(eq(userCourses.userId, user_id));
    return Response.json(result);
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Error occurred while fetching courses: ${errorMessage}`,
      {
        status: 400,
      });
  }
}

