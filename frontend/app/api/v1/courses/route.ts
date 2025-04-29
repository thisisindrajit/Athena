import type { NextApiRequest } from 'next'
import { db } from '@/db';
import { courses } from '@/db/schema';

export async function GET (req: NextApiRequest) {
  try {
    console.log(req);

    const result = await db.select().from(courses);
    return Response.json(result);
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(`Error: ${errorMessage}`, {
      status: 400,
    });
  }
}

