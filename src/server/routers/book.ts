import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { and, eq, isNull } from 'drizzle-orm';
import { z } from 'zod';

import { book, folder } from '@/db/schema';
import { env } from '@/lib/env';
import { createBookSchema, createFolderSchema } from '@/types';

import { createTRPCRouter, protectedProcedure } from '../trpc';

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const bookRouter = createTRPCRouter({
  getSignedUrlForUploadingFile: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const timestamp = new Date().getTime();
      const key = `${ctx.session.user.id}/${timestamp}-${input.filename}`;
      const signedUrl = await getSignedUrl(
        s3Client,
        new PutObjectCommand({
          Bucket: env.AWS_BUCKET_NAME,
          Key: key,
          ContentType: input.contentType,
        }),
      );
      return { signedUrl, key };
    }),
  createBook: protectedProcedure
    .input(z.object({ schema: createBookSchema, parentFolder: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(book).values({
        title: input.schema.title,
        thumbnailImageS3Path: input.schema.thumbnailImageS3Path,
        pdfFileS3Path: input.schema.pdfFileS3Path,
        userId: ctx.session.user.id,
        parentFolder: input.parentFolder.length > 0 ? input.parentFolder : null,
      });
    }),
  createFolder: protectedProcedure
    .input(
      z.object({
        schema: createFolderSchema,
        parentFolder: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(folder).values({
        name: input.schema.name,
        parentFolder: input.parentFolder.length > 0 ? input.parentFolder : null,
        userId: ctx.session.user.id,
      });
    }),
  getFolders: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const filter = input.length > 0 ? eq(folder.parentFolder, input) : isNull(folder.parentFolder);
    return ctx.db
      .select()
      .from(folder)
      .where(and(eq(folder.userId, ctx.session.user.id), filter));
  }),
  getBooks: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const filter = input.length > 0 ? eq(book.parentFolder, input) : isNull(book.parentFolder);
    return ctx.db
      .select()
      .from(book)
      .where(and(eq(book.userId, ctx.session.user.id), filter));
  }),
});
