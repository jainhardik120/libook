import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { TRPCError } from '@trpc/server';
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
  getSignedUrlForUploadingFiles: protectedProcedure
    .input(
      z.array(
        z.object({
          filename: z.string(),
          contentType: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const uploadUrls = await Promise.all(
        input.map(async (file) => {
          const key = `${ctx.session.user.id}/${new Date().getTime()}-${file.filename}`;
          const command = new PutObjectCommand({
            Bucket: env.AWS_BUCKET_NAME,
            Key: key,
            ContentType: file.contentType,
          });
          const presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });
          return {
            fileName: file.filename,
            uploadUrl: presignedUrl,
            key,
          };
        }),
      );
      const map = new Map<string, { key: string; uploadUrl: string }>();
      uploadUrls.forEach((uploadUrl) => {
        map.set(uploadUrl.fileName, {
          key: uploadUrl.key,
          uploadUrl: uploadUrl.uploadUrl,
        });
      });
      return map;
    }),
  createBook: protectedProcedure
    .input(z.object({ schema: createBookSchema, parentFolder: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(book).values({
        title: input.schema.title,
        thumbnailImageS3Path:
          input.schema.thumbnailImageS3Path.length > 0 ? input.schema.thumbnailImageS3Path[0] : '',
        pdfFileS3Path: input.schema.pdfFileS3Path.length > 0 ? input.schema.pdfFileS3Path[0] : '',
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
  getBookData: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const foundBook = await ctx.db.select().from(book).where(eq(book.id, input));
    if (foundBook.length === 0) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }
    const key = foundBook[0].pdfFileS3Path;
    if (key === null || key === '') {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }
    const command = new GetObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    });
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    return {
      presignedUrl,
      ...foundBook[0],
    };
  }),
});
