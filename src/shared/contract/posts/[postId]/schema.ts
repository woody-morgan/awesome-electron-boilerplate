import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

import { createPostSchema } from '../schema';

extendZodWithOpenApi(z);

export const updatePostSchema = z.object({}).extend({
  title: createPostSchema.shape.title,
  content: createPostSchema.shape.content,
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
