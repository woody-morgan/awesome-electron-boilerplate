import { UsePostReq } from './usePost';

export const postsKey = {
  all: ['posts/all'],
  listPosts: () => [...postsKey.all, 'posts/list'],
  getPost: (args: UsePostReq) => [
    ...postsKey.listPosts(),
    'posts/get',
    {
      ...args,
    },
  ],
};
