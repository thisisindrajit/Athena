import type { NextApiRequest } from 'next'
import { db } from '@/db';
import { courses } from '@/db/schema';

export async function GET (req: NextApiRequest) {
  try {
    const result = await db.select().from(courses);
    return Response.json(result);
  } catch (err: Error | any) {
    return new Response(`Error: ${err.message}`, {
      status: 400,
    });
  }
}

