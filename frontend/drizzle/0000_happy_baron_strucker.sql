-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "user_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_token_key" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"course_id" bigint PRIMARY KEY NOT NULL,
	"topic" text NOT NULL,
	"description" text,
	"preferences" jsonb NOT NULL,
	"metadata" jsonb NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "modules" (
	"module_id" bigint PRIMARY KEY NOT NULL,
	"course_id" integer,
	"title" text NOT NULL,
	"description" text,
	"metadata" jsonb NOT NULL,
	"module_order" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"lesson_id" bigint PRIMARY KEY NOT NULL,
	"module_id" integer,
	"title" text NOT NULL,
	"content" jsonb NOT NULL,
	"display_order" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "activities" (
	"activity_id" bigint PRIMARY KEY NOT NULL,
	"module_id" integer,
	"title" text NOT NULL,
	"type" varchar(50) NOT NULL,
	"content" jsonb NOT NULL,
	"display_order" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "user_courses" (
	"enrollment_id" bigint PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" integer NOT NULL,
	"enrolled_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"last_accessed_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_courses_user_id_course_id_key" UNIQUE("user_id","course_id")
);
--> statement-breakpoint
CREATE TABLE "snippets" (
	"snippet_id" bigint PRIMARY KEY NOT NULL,
	"module_id" integer,
	"title" text NOT NULL,
	"overview" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"progress_id" bigint PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"entity_type" varchar(20) NOT NULL,
	"entity_id" integer NOT NULL,
	"is_completed" boolean DEFAULT false,
	"is_liked" boolean DEFAULT false,
	"is_saved" boolean DEFAULT false,
	"last_accessed_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_progress_user_id_entity_type_entity_id_key" UNIQUE("user_id","entity_type","entity_id")
);
--> statement-breakpoint
CREATE TABLE "snippet_interactions" (
	"interaction_id" bigint PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"snippet_id" integer NOT NULL,
	"is_liked" boolean DEFAULT false,
	"is_saved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "snippet_interactions_user_id_snippet_id_key" UNIQUE("user_id","snippet_id")
);
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("module_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("module_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("module_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snippet_interactions" ADD CONSTRAINT "snippet_interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snippet_interactions" ADD CONSTRAINT "snippet_interactions_snippet_id_fkey" FOREIGN KEY ("snippet_id") REFERENCES "public"."snippets"("snippet_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_user_courses" ON "user_courses" USING btree ("user_id" int4_ops,"course_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_user_progress" ON "user_progress" USING btree ("user_id" int4_ops,"entity_type" text_ops,"entity_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_snippet_interactions" ON "snippet_interactions" USING btree ("user_id" int4_ops,"snippet_id" text_ops);
*/