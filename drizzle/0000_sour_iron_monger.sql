CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"userId" text DEFAULT 'd5df1ad4-fd41-48e4-8da2-46f953e14aa7',
	"isArchived" boolean,
	"isPublished" boolean,
	"content" text,
	"icon" text,
	"coverImage" text,
	"parentDocument" text,
	"created_on" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"created_on" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "userId_idx" ON "documents" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "parentDoc_idx" ON "documents" USING btree ("parentDocument");