import { db } from "@/db";
import { courses, lessons, modules, activities } from "@/drizzle/schema";
import { Course } from "@/types/interfaces";
import { eq, asc } from "drizzle-orm";
import { NextApiRequest } from "next";

export async function GET(
  req: NextApiRequest,
  { params }: { params: Promise<{ course_id: number }> }
) {
  try {
    const { course_id } = await params;

    // Fetch and aggregate data
    const result = await db
      .select({
        courseId: courses.courseId,
        courseTopic: courses.topic,
        courseDescription: courses.description,
        coursePreferences: courses.preferences,
        courseMetadata: courses.metadata,
        moduleId: modules.moduleId,
        moduleTitle: modules.title,
        moduleDescription: modules.description,
        moduleOrder: modules.moduleOrder,
        lessonId: lessons.lessonId,
        lessonTitle: lessons.title,
        lessonContent: lessons.content,
        lessonDisplayOrder: lessons.displayOrder,
        activityId: activities.activityId,
        activityTitle: activities.title,
        activityType: activities.type,
        activityContent: activities.content,
        activityDisplayOrder: activities.displayOrder,
      })
      .from(courses)
      .leftJoin(modules, eq(modules.courseId, courses.courseId))
      .leftJoin(activities, eq(activities.moduleId, modules.moduleId))
      .leftJoin(lessons, eq(lessons.moduleId, modules.moduleId))
      .where(eq(courses.courseId, course_id))
      .orderBy(
        asc(modules.moduleOrder),
        asc(lessons.displayOrder),
        asc(activities.displayOrder)
      );

    const aggregatedResult = result.reduce((acc: Course[], row) => {
      let course = acc.find((c) => c.courseId === row.courseId);
      if (!course) {
        course = {
          courseId: row.courseId,
          topic: row.courseTopic,
          description: row.courseDescription ?? "",
          preferences: row.coursePreferences as {
            level: string;
            duration: string;
            focus: string;
          },
          metadata: row.courseMetadata,
          modules: [],
        };
        acc.push(course);
      }

      let courseModule = course.modules.find((m) => m.moduleId === row.moduleId);
      if (!courseModule && row.moduleId) {
        courseModule = {
          moduleId: row.moduleId,
          title: row.moduleTitle,
          description: row.moduleDescription,
          moduleOrder: row.moduleOrder,
          content: [],
        };
        course.modules.push(module);
      }

      if (courseModule) {
        if (row.lessonId) {
          const lesson = courseModule.content.find(
            (c: { lesson_id: number | null }) => c.lesson_id === row.lessonId
          );
          if (!lesson) {
            courseModule.content.push({
              lesson_id: row.lessonId,
              title: row.lessonTitle,
              content: row.lessonContent,
              displayOrder: row.lessonDisplayOrder,
            });
          }
        }

        if (row.activityId) {
          const activity = courseModule.content.find(
            (c: { activity_id: number | null }) =>
              c.activity_id === row.activityId
          );
          if (!activity) {
            courseModule.content.push({
              activity_id: row.activityId,
              title: row.activityTitle,
              activityType: row.activityType,
              content: row.activityContent,
              displayOrder: row.activityDisplayOrder,
            });
          }
        }

        // Sort content by displayOrder
        courseModule.content.sort(
          (a: { displayOrder: number }, b: { displayOrder: number }) =>
            a.displayOrder - b.displayOrder
        );
      }

      return acc;
    }, []);

    // Sort modules by moduleOrder
    aggregatedResult.forEach((course) => {
      course.modules.sort((a, b) => a.moduleOrder - b.moduleOrder);
    });

    return new Response(JSON.stringify(aggregatedResult), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: Error | unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    return new Response(
      `Error occurred while fetching course: ${errorMessage}`,
      {
        status: 400,
      }
    );
  }
}
