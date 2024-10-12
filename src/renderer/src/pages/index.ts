import { ErrorPage } from './error';
import { PostsPage } from './posts';
import { PostByIdPage } from './posts/[postId]';

export const pages = {
  posts: PostsPage,
  postById: PostByIdPage,
  error: ErrorPage,
};
