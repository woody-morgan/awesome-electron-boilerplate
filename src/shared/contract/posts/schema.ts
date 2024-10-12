import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const postId = z.string().uuid().openapi({
  description: 'Post ID',
});

export type PostId = z.infer<typeof postId>;

export const createPostSchema = z.object({
  title: z.string().min(1).openapi({
    description: 'Post title',
  }),
  content: z.string().min(1).openapi({
    description: 'Post content',
  }),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const postSchema = z
  .object({
    id: postId,
  })
  .merge(createPostSchema)
  .openapi({ description: 'Post Schema' });

export type PostSchema = z.infer<typeof postSchema>;
