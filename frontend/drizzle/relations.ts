import { relations } from "drizzle-orm/relations";
import { user, session, account, courses, modules, lessons, activities, userProgress, snippets, snippetInteractions, userCourses } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	accounts: many(account),
	userProgresses: many(userProgress),
	snippetInteractions: many(snippetInteractions),
	userCourses: many(userCourses),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const modulesRelations = relations(modules, ({one, many}) => ({
	course: one(courses, {
		fields: [modules.courseId],
		references: [courses.courseId]
	}),
	lessons: many(lessons),
	activities: many(activities),
	snippets: many(snippets),
}));

export const coursesRelations = relations(courses, ({many}) => ({
	modules: many(modules),
	userCourses: many(userCourses),
}));

export const lessonsRelations = relations(lessons, ({one}) => ({
	module: one(modules, {
		fields: [lessons.moduleId],
		references: [modules.moduleId]
	}),
}));

export const activitiesRelations = relations(activities, ({one}) => ({
	module: one(modules, {
		fields: [activities.moduleId],
		references: [modules.moduleId]
	}),
}));

export const userProgressRelations = relations(userProgress, ({one}) => ({
	user: one(user, {
		fields: [userProgress.userId],
		references: [user.id]
	}),
}));

export const snippetsRelations = relations(snippets, ({one, many}) => ({
	module: one(modules, {
		fields: [snippets.moduleId],
		references: [modules.moduleId]
	}),
	snippetInteractions: many(snippetInteractions),
}));

export const snippetInteractionsRelations = relations(snippetInteractions, ({one}) => ({
	user: one(user, {
		fields: [snippetInteractions.userId],
		references: [user.id]
	}),
	snippet: one(snippets, {
		fields: [snippetInteractions.snippetId],
		references: [snippets.snippetId]
	}),
}));

export const userCoursesRelations = relations(userCourses, ({one}) => ({
	user: one(user, {
		fields: [userCourses.userId],
		references: [user.id]
	}),
	course: one(courses, {
		fields: [userCourses.courseId],
		references: [courses.courseId]
	}),
}));