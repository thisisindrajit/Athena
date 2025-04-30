import { courses, modules, activities, lessons, userCourses } from "@/drizzle/schema";
import { GenerateCourseRequest } from "@/types/GenerateCourseRequest";
import { db } from "@/db";
import { IMetadata } from "@/interfaces/IMetadata";
import { eq } from "drizzle-orm";
import * as fs from 'fs';
import * as path from 'path';

// Save the generated course to the database
export const saveCourseToDatabase = async (responseJson: any, requestBody: GenerateCourseRequest) => {
    // Initialize course metadata
    try {
    const courseMetadata: IMetadata = {
      count: {
        modules: 0,
        lessons: 0,
        activities: 0,
      },
    };
  
    // Insert course first
    const [insertedCourse] = await db
      .insert(courses)
      .values({
        topic: responseJson.topic,
        description: responseJson.description,
        preferences: requestBody.preferences,
        metadata: {},
      })
      .returning();
  
    // Insert modules with course reference
    await Promise.all(
      responseJson.modules.map(
        async (
          moduleData: { title: string; description: string; content: any[] },
          moduleIndex: number
        ) => {
          courseMetadata["count"]["modules"] += 1;
          const [insertedModule] = await db
            .insert(modules)
            .values({
              courseId: insertedCourse.courseId,
              title: moduleData.title,
              description: moduleData.description,
              metadata: {},
              moduleOrder: moduleIndex + 1,
            })
            .returning();
  
          await Promise.all(
            moduleData.content.map(async (data, contentIndex) => {
              // Check if it's a lesson
              if (data.lesson_title) {
                courseMetadata["count"]["lessons"] += 1;
                await db.insert(lessons).values({
                  title: data.lesson_title,
                  content: data.content,
                  moduleId: insertedModule.moduleId,
                  displayOrder: contentIndex + 1,
                });
              }
              // Check if it's an activity (QUIZ)
              else if (data.quiz_title) {
                courseMetadata["count"]["activities"] += 1;
                await db.insert(activities).values({
                  title: data.quiz_title,
                  type: data.type,
                  content: data.content,
                  moduleId: insertedModule.moduleId,
                  displayOrder: contentIndex + 1,
                });
              }
            })
          );
        }
      )
    );
  
    // Update course metadata with the counts
    await db
      .update(courses)
      .set({
        metadata: courseMetadata,
      })
      .where(eq(courses.courseId, insertedCourse.courseId));
  
    console.log(`Course saved to database successfully for topic ${
      requestBody.topic
    } with courseId ${insertedCourse.courseId}`);
  
    return { courseMetadata, courseId: insertedCourse.courseId };
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Failed to save course to database:", err);
      throw new Error(`Failed to save course to database: ${errorMessage}`);
    }
  }
  
  // Save to user_courses table
export const saveToUserCourses = async (courseId: number, userId: string) => {
    try {
      await db.insert(userCourses).values({
        userId: userId,
        courseId: courseId,
      });
  
      console.log(`User course saved to database successfully for userId ${userId} and courseId ${courseId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Failed to save user_courses to database:", err);
      throw new Error(`Failed to save user_courses to database: ${errorMessage}`);
    }
  }
  
  
  // Save the generated course to a file
export const saveCourseToFile = (responseJson: any) => {
    try {
      console.log("Saving course to file...");
      const debugDir = path.join(process.cwd(), "debug");
  
      // Create debug directory if it doesn't exist
      if (!fs.existsSync(debugDir)) {
        fs.mkdirSync(debugDir);
      }
  
      // Save response with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      fs.writeFileSync(
        path.join(debugDir, `course-response-${timestamp}.json`),
        JSON.stringify(responseJson, null, 2)
      );
  
      console.log("Course saved to file successfully.");
    } catch (err) {
      console.error("Failed to save debug file:", err);
    }
  };