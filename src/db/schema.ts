import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const book = pgTable('book', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title').notNull(),
  author: varchar('author').notNull(),
  genre: varchar('genre').notNull(),
  price: varchar('price').notNull(),
  publish_date: varchar('publish_date').notNull(),
});
