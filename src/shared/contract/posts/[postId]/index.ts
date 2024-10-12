import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import { createPostSchema, postId, postSchema } from '../schema';

extendZodWithOpenApi(z);

const c = initContract();

export const postIdContract = c.router({
  getPost: {
    method: 'GET',
    path: '/posts/:postId',
    pathParams: z.object({
      postId,
    }),
    responses: {
      200: postSchema,
      404: z
        .object({
          message: z.string().min(1),
        })
        .openapi({ description: 'Post not found' }),
    },
    summary: 'Get a specific post',
  },
  updatePost: {
    method: 'PUT',
    path: '/posts/:postId',
    pathParams: z.object({
      postId,
    }),
    body: createPostSchema,
    responses: {
      200: postSchema,
      404: c.type<{
        message: string;
      }>(),
    },
    summary: 'Update a specific post',
  },
  deletePost: {
    method: 'DELETE',
    path: '/posts/:postId',
    pathParams: z.object({
      postId,
    }),
    body: z.object({}),
    responses: {
      200: z.object({}),
      404: c.type<{
        message: string;
      }>(),
    },
    summary: 'Delete a specific post',
  },
});
