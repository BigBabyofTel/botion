CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"userId" text DEFAULT '65f31999-b3bd-4705-871a-04234bea2c07',
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
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"created_on" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "userId_idx" ON "documents" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "parentDoc_idx" ON "documents" USING btree ("parentDocument");