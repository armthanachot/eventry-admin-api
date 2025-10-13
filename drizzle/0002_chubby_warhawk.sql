CREATE TYPE "public"."file_type" AS ENUM('IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO');--> statement-breakpoint
CREATE TABLE "event_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_url" text NOT NULL,
	"file_type" "file_type" NOT NULL,
	"file_size" varchar(50),
	"mime_type" varchar(100),
	"created_at" timestamp DEFAULT current_timestamp NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
ALTER TABLE "event_organizers" DROP CONSTRAINT "event_organizers_event_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "created_at" SET DEFAULT current_timestamp;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "updated_at" SET DEFAULT current_timestamp;
ALTER TABLE "events" ADD COLUMN "event_banner_url" text;--> statement-breakpoint
ALTER TABLE "event_files" ADD CONSTRAINT "event_files_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;