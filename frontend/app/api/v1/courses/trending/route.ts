import { db } from "@/db";
import { courses } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    
    const result = await db.select().from(courses).orderBy(desc(courses.createdAt));

    return Response.json(result);
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Error occurred while fetching trending courses: ${errorMessage}`,
      {
        status: 400,
      }
    );
  }
}
