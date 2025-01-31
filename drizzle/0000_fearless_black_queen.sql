CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"userId" uuid,
	"documentId" uuid DEFAULT gen_random_uuid(),
	"isArchived" boolean DEFAULT false,
	"isPublished" boolean DEFAULT false,
	"content" text,
	"icon" text,
	"coverImage" text,
	"parentDocument" uuid,
	"created_on" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"created_on" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "userId_idx" ON "documents" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "parentDoc_idx" ON "documents" USING btree ("parentDocument");--> statement-breakpoint
CREATE UNIQUE INDEX "docId_idx" ON "documents" USING btree ("documentId");