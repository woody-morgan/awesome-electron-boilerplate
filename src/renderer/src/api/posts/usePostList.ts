import { useSuspenseQuery } from '@tanstack/react-query';
import { match } from 'ts-pattern';

import { client } from '@/api/client';
import { postsKey } from '@/api/posts/query-key';
import { ExtractSuspenseQueryArgs } from '@/types/api/react-query';

type UsePostList = ExtractSuspenseQueryArgs<typeof client.posts.listPost>;
export type UsePostListReq = UsePostList[0];

export function usePostList(...[, options]: UsePostList) {
  return useSuspenseQuery({
    queryKey: postsKey.listPosts(),
    queryFn: async () => {
      const response = await client.posts.listPost();

      return match(response)
        .with({ status: 200 }, ({ body }) => {
          return body;
        })
        .otherwise(({ body }) => {
          throw new Error(body.message);
        });
    },
    ...options,
  });
}
