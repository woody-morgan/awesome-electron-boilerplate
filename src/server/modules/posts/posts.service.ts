import { randomUUID } from 'crypto';

import { A } from '@mobily/ts-belt';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TsRestException } from '@ts-rest/nest';

import { contract } from '@shared/contract';
import { UpdatePostSchema } from '@shared/contract/posts/[postId]/schema';
import { CreatePostSchema, PostSchema } from '@shared/contract/posts/schema';

@Injectable()
export class PostsService {
  private posts = A.range(0, 20).map((val) => ({
    id: randomUUID(),
    title: `Hello ${val}`,
    content: `World ${val}`,
  }));
  logger = new Logger(PostsService.name);

  constructor() {}

  async listPosts() {
    return this.posts;
  }

  async getPost({ postId }: { postId: string }): Promise<PostSchema> {
    const post = this.posts.find((post) => post.id === postId);

    if (!post) {
      throw new TsRestException(contract.posts.getPost, {
        status: HttpStatus.NOT_FOUND,
        body: { message: 'Post not found' },
      });
    }

    return post;
  }

  async createPost(req: CreatePostSchema): Promise<PostSchema> {
    const post = {
      id: randomUUID(),
      ...req,
    };

    this.posts.push(post);

    return post;
  }

  async updatePost({
    postId,
    body,
  }: {
    postId: string;
    body: UpdatePostSchema;
  }): Promise<PostSchema> {
    const post = this.posts.find((post) => post.id === postId);

    if (!post) {
      throw new TsRestException(contract.posts.updatePost, {
        status: HttpStatus.NOT_FOUND,
        body: { message: 'Post not found' },
      });
    }

    const updatedPost = { ...post, ...body };

    this.posts = this.posts.map((post) => (post.id === postId ? updatedPost : post));

    return updatedPost;
  }

  async deletePost({ postId }: { postId: string }): Promise<void> {
    const post = this.posts.find((post) => post.id === postId);

    if (!post) {
      throw new TsRestException(contract.posts.deletePost, {
        status: HttpStatus.NOT_FOUND,
        body: { message: 'Post not found' },
      });
    }

    this.posts = this.posts.filter((post) => post.id !== postId);

    return;
  }
}
