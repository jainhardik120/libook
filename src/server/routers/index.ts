import { createTRPCRouter } from '@/server/trpc';

import { bookRouter } from './book';

import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server';

export const appRouter = createTRPCRouter({
  book: bookRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
