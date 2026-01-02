CREATE TABLE "book" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"author" varchar NOT NULL,
	"genre" varchar NOT NULL,
	"price" varchar NOT NULL,
	"publish_date" varchar NOT NULL
);
