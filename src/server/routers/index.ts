import { book } from '@/db/schema';
import { createTRPCRouter, publicProcedure } from '@/server/trpc';

import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server';

export const appRouter = createTRPCRouter({
  getAllBooks: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(book);
  }),
  createNewBook: publicProcedure.mutation(({ ctx }) => {
    return ctx.db.insert(book).values({
      title: 'title',
      author: 'author',
      genre: 'genre',
      price: 'price',
      publish_date: 'publish_date',
    });
  }),
});

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
