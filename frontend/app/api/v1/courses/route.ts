import { db } from "@/db";
import { courses } from "@/drizzle/schema";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log(req);
    
    const result = await db.select().from(courses);

    return Response.json(result);
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Error occurred while fetching courses: ${errorMessage}`,
      {
        status: 400,
      }
    );
  }
}
