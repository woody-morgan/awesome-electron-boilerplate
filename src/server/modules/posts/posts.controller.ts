import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

import { contract } from '@shared/contract';

import { PostsService } from './posts.service.js';

@Controller()
export class PostsController {
  logger = new Logger(PostsController.name);
  constructor(private readonly postService: PostsService) {}

  @TsRestHandler(contract.posts)
  async handler() {
    return tsRestHandler(contract.posts, {
      listPost: async () => {
        const posts = await this.postService.listPosts();
        return {
          status: HttpStatus.OK as const,
          body: {
            posts,
          },
        };
      },
      getPost: async ({ params }) => {
        const { postId } = params;
        const res = await this.postService.getPost({
          postId,
        });
        return {
          status: HttpStatus.OK as const,
          body: res,
        };
      },
      createPost: async ({ body }) => {
        const res = await this.postService.createPost({
          ...body,
        });

        return {
          status: HttpStatus.OK as const,
          body: res,
        };
      },
      updatePost: async ({ body, params }) => {
        const { postId } = params;

        const post = await this.postService.updatePost({
          postId,
          body,
        });

        return {
          status: HttpStatus.OK as const,
          body: post,
        };
      },
      deletePost: async ({ params }) => {
        const { postId } = params;
        await this.postService.deletePost({
          postId,
        });

        return {
          status: HttpStatus.OK as const,
          body: {},
        };
      },
    });
  }
}
