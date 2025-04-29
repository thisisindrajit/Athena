import type { NextApiRequest } from 'next'
import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET (
    req: NextApiRequest,  
    { params }: { params: Promise<{ course_id: bigint }> }
) {
  try {
    const { course_id } = await params;
    const result = await db.select().from(courses).where(eq(courses.courseId, course_id));
    return Response.json(result);
  } catch (err: Error | any) {
    return new Response(`Error: ${err.message}`, {
      status: 400,
    });
  }
}

