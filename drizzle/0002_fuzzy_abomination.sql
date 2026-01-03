CREATE TABLE "folder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"parent_folder" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "book" ADD COLUMN "parent_folder" uuid;--> statement-breakpoint
ALTER TABLE "book" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "book" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "book" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "book" ADD COLUMN "thumbnail_image_s3_path" varchar;--> statement-breakpoint
ALTER TABLE "book" ADD COLUMN "pdf_file_s3_path" varchar;--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN "author";--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN "genre";--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "book" DROP COLUMN "publish_date";