import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().optional(),
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env['NEXT_PUBLIC_BASE_URL'],
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
      process.env['NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL'],
    NODE_ENV: process.env['NODE_ENV'],
    GITHUB_CLIENT_ID: process.env['GITHUB_CLIENT_ID'],
    GITHUB_CLIENT_SECRET: process.env['GITHUB_CLIENT_SECRET'],
  },
  skipValidation:
    process.env['SKIP_ENV_VALIDATION'] !== undefined &&
    process.env['SKIP_ENV_VALIDATION'] === 'true',
  emptyStringAsUndefined: true,
});
