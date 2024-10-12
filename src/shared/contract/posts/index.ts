import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import { postIdContract } from './[postId]';
import { createPostSchema, postSchema } from './schema';

extendZodWithOpenApi(z);

const c = initContract();

export const postContract = c.router({
  listPost: {
    method: 'GET',
    path: '/posts',
    responses: {
      200: z.object({
        posts: z.array(postSchema),
      }),
      404: z
        .object({
          message: z.string().min(1),
        })
        .openapi({ description: 'Post not found' }),
    },
    summary: 'List all posts',
  },
  createPost: {
    method: 'POST',
    path: '/posts',
    body: createPostSchema,
    responses: {
      200: postSchema,
      404: c.type<{
        message: string;
      }>(),
    },
    summary: 'Create a new post',
  },
  ...postIdContract,
});
