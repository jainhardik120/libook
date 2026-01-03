import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { user } from './auth-schema';

export const folder = pgTable('folder', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  parentFolder: uuid('parent_folder'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
});

export const book = pgTable('book', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title').notNull(),
  parentFolder: uuid('parent_folder'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  thumbnailImageS3Path: varchar('thumbnail_image_s3_path'),
  pdfFileS3Path: varchar('pdf_file_s3_path'),
});
