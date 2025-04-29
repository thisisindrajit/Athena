import { pgTable, unique, text, boolean, timestamp, foreignKey, bigint, jsonb, integer, varchar, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean().notNull(),
	image: text(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	unique("user_email_key").on(table.email),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_fkey"
		}),
	unique("session_token_key").on(table.token),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: timestamp({ mode: 'string' }),
	refreshTokenExpiresAt: timestamp({ mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_fkey"
		}),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	createdAt: timestamp({ mode: 'string' }),
	updatedAt: timestamp({ mode: 'string' }),
});

export const courses = pgTable("courses", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	courseId: bigint("course_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "courses_course_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	topic: text().notNull(),
	description: text(),
	preferences: jsonb().notNull(),
	metadata: jsonb().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const modules = pgTable("modules", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	moduleId: bigint("module_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "modules_module_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	courseId: integer("course_id"),
	title: text().notNull(),
	description: text(),
	metadata: jsonb().notNull(),
	moduleOrder: integer("module_order"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.courseId],
			name: "modules_course_id_fkey"
		}).onDelete("cascade"),
]);

export const lessons = pgTable("lessons", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	lessonId: bigint("lesson_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "lessons_lesson_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	moduleId: integer("module_id"),
	title: text().notNull(),
	content: jsonb().notNull(),
	displayOrder: integer("display_order"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.moduleId],
			foreignColumns: [modules.moduleId],
			name: "lessons_module_id_fkey"
		}).onDelete("cascade"),
]);

export const activities = pgTable("activities", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	activityId: bigint("activity_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "activities_activity_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	moduleId: integer("module_id"),
	title: text().notNull(),
	type: varchar({ length: 50 }).notNull(),
	content: jsonb().notNull(),
	displayOrder: integer("display_order"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.moduleId],
			foreignColumns: [modules.moduleId],
			name: "activities_module_id_fkey"
		}).onDelete("cascade"),
]);

export const userCourses = pgTable("user_courses", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	enrollmentId: bigint("enrollment_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "user_courses_enrollment_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	userId: text("user_id").notNull(),
	courseId: integer("course_id").notNull(),
	enrolledAt: timestamp("enrolled_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	lastAccessedAt: timestamp("last_accessed_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_user_courses").using("btree", table.userId.asc().nullsLast().op("int4_ops"), table.courseId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "user_courses_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.courseId],
			name: "user_courses_course_id_fkey"
		}).onDelete("cascade"),
	unique("user_courses_user_id_course_id_key").on(table.userId, table.courseId),
]);

export const snippets = pgTable("snippets", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	snippetId: bigint("snippet_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "snippets_snippet_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	moduleId: integer("module_id"),
	title: text().notNull(),
	overview: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.moduleId],
			foreignColumns: [modules.moduleId],
			name: "snippets_module_id_fkey"
		}).onDelete("cascade"),
]);

export const userProgress = pgTable("user_progress", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	progressId: bigint("progress_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "user_progress_progress_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	userId: text("user_id").notNull(),
	entityType: varchar("entity_type", { length: 20 }).notNull(),
	entityId: integer("entity_id").notNull(),
	isCompleted: boolean("is_completed").default(false),
	isLiked: boolean("is_liked").default(false),
	isSaved: boolean("is_saved").default(false),
	lastAccessedAt: timestamp("last_accessed_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "user_progress_user_id_fkey"
		}).onDelete("cascade"),
	unique("user_progress_user_id_entity_type_entity_id_key").on(table.userId, table.entityType, table.entityId),
]);

export const snippetInteractions = pgTable("snippet_interactions", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	interactionId: bigint("interaction_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "snippet_interactions_interaction_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	userId: text("user_id").notNull(),
	snippetId: integer("snippet_id").notNull(),
	isLiked: boolean("is_liked").default(false),
	isSaved: boolean("is_saved").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_snippet_interactions").using("btree", table.userId.asc().nullsLast().op("int4_ops"), table.snippetId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "snippet_interactions_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.snippetId],
			foreignColumns: [snippets.snippetId],
			name: "snippet_interactions_snippet_id_fkey"
		}).onDelete("cascade"),
	unique("snippet_interactions_user_id_snippet_id_key").on(table.userId, table.snippetId),
]);
