import { integer, pgTable, varchar, text, jsonb, timestamp, boolean, serial, unique } from "drizzle-orm/pg-core";

const timeStampHelpers = {
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
}

// Courses Table
export const courses = pgTable("courses", {
  courseId: serial("course_id").primaryKey(),
  topic: text("topic").notNull(),
  description: text("description"),
  preferences: jsonb("preferences").notNull(),
  metadata: jsonb("metadata").notNull(),
  ...timeStampHelpers
});

// Modules Table
export const modules = pgTable("modules", {
  moduleId: serial("module_id").primaryKey(),
  courseId: integer("course_id").references(() => courses.courseId, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  metadata: jsonb("metadata").notNull(),
  moduleOrder: integer("module_order"),
  ...timeStampHelpers
});

// Lessons Table
export const lessons = pgTable("lessons", {
  lessonId: serial("lesson_id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.moduleId, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: jsonb("content").notNull(),
  displayOrder: integer("display_order"),
  ...timeStampHelpers
});

// Activities Table
export const activities = pgTable("activities", {
  activityId: serial("activity_id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.moduleId, { onDelete: "cascade" }),
  title: text("title").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  content: jsonb("content").notNull(),
  displayOrder: integer("display_order"),
  ...timeStampHelpers
});

// User Courses Table
export const userCourses = pgTable("user_courses", {
  enrollmentId: serial("enrollment_id").primaryKey(),
  userId: text("user_id").notNull(),
  courseId: integer("course_id").references(() => courses.courseId, { onDelete: "cascade" }),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
}, (table) => [
    unique().on(table.userId, table.courseId),
    unique('idx_user_courses').on(table.userId, table.courseId)
]);

// Snippets Table
export const snippets = pgTable("snippets", {
  snippetId: serial("snippet_id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.moduleId, { onDelete: "cascade" }),
  title: text("title").notNull(),
  overview: text("overview").notNull(),
  ...timeStampHelpers
});

// User Progress Table
export const userProgress = pgTable("user_progress", {
  progressId: serial("progress_id").primaryKey(),
  userId: text("user_id").notNull(),
  entityType: varchar("entity_type", { length: 20 }).notNull(),
  entityId: integer("entity_id").notNull(),
  isCompleted: boolean("is_completed").default(false),
  isLiked: boolean("is_liked").default(false),
  isSaved: boolean("is_saved").default(false),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
    unique().on(table.userId, table.entityType, table.entityId),
    unique('idx_user_progress').on(table.userId, table.entityType, table.entityId)
]);

// Snippet Interactions Table
export const snippetInteractions = pgTable("snippet_interactions", {
  interactionId: serial("interaction_id").primaryKey(),
  userId: text("user_id").notNull(),
  snippetId: integer("snippet_id").references(() => snippets.snippetId, { onDelete: "cascade" }),
  isLiked: boolean("is_liked").default(false),
  isSaved: boolean("is_saved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
    unique().on(table.userId, table.snippetId),
    unique('idx_snippet_interactions').on(table.userId, table.snippetId)
]);