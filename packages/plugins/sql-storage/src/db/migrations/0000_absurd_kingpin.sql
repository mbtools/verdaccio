CREATE TABLE IF NOT EXISTS "local_packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer,
	"name" text NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "local_packages_id_unique" UNIQUE("id"),
	CONSTRAINT "local_packages_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orgs" (
	"id" serial PRIMARY KEY NOT NULL,
	"org" text NOT NULL,
	"name" text NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	"deleted" timestamp,
	CONSTRAINT "orgs_id_unique" UNIQUE("id"),
	CONSTRAINT "orgs_org_unique" UNIQUE("org")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer,
	"storage" text NOT NULL,
	"name" text NOT NULL,
	"json" jsonb NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "packages_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "secrets" (
	"name" text PRIMARY KEY NOT NULL,
	"value" text,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "secrets_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tarballs" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer,
	"storage" text NOT NULL,
	"name" text NOT NULL,
	"version" text NOT NULL,
	"filename" text NOT NULL,
	"data" "bytea" NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tarballs_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens" (
	"user" text NOT NULL,
	"token" text NOT NULL,
	"key" text NOT NULL,
	"cidr" text[],
	"readonly" boolean NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tokens_user_unique" UNIQUE("user")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	"deleted" timestamp,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_user_unique" UNIQUE("user")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "local_packages" ADD CONSTRAINT "local_packages_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tarballs" ADD CONSTRAINT "tarballs_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "packages_storage_name_index" ON "packages" USING btree ("storage","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tarballs_storage_name_version_index" ON "tarballs" USING btree ("storage","name","version");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tarballs_filename_index" ON "tarballs" USING btree ("filename");