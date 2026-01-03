import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string(),
  thumbnailImageS3Path: z.string(),
  pdfFileS3Path: z.string(),
});

export const createFolderSchema = z.object({
  name: z.string().min(1),
});
