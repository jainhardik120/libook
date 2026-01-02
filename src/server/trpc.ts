import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { treeifyError, ZodError } from 'zod';

import logger from '@/lib/logger';
import { db } from '@/db';

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? treeifyError(error.cause) : null,
    },
  }),
});

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  const result = await next();
  const end = Date.now();
  logger.info(`TRPC ${path} took ${end - start}ms to execute`, {
    path,
    durationMs: end - start,
  });
  return result;
});

export const createTRPCContext = (opts: { headers: Headers }) => {
  return {
    ...opts,
    db: db,
  };
};

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure.use(timingMiddleware).use(async ({ ctx, next }) => {
  return next({
    ctx: {
      ...ctx,
    },
  });
});
