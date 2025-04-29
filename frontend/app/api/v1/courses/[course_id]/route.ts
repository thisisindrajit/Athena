import { db } from '@/db';
import { courses } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest } from 'next';

export async function GET (
    req: NextApiRequest,  
    { params }: { params: Promise<{ course_id: number }> }
) {
  try {
    const { course_id } = await params;
    const result = await db.select().from(courses).where(eq(courses.courseId, course_id));
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

