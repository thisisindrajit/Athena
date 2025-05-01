import { db } from "@/db";
import { courses } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    let result;

    if (limit) {
      result = await db
        .select()
        .from(courses)
        .orderBy(desc(courses.createdAt))
        .limit(Number(limit));
    } else {
      result = await db.select().from(courses).orderBy(desc(courses.createdAt));
    }

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
