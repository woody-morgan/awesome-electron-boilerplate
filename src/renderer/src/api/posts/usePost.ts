import { useSuspenseQuery } from '@tanstack/react-query';
import { match } from 'ts-pattern';

import { client } from '@/api/client';
import { postsKey } from '@/api/posts/query-key';
import { ExtractSuspenseQueryArgs } from '@/types/api/react-query';

type UsePost = ExtractSuspenseQueryArgs<typeof client.posts.getPost>;
export type UsePostReq = UsePost[0];

export function usePost(...[req, options]: UsePost) {
  return useSuspenseQuery({
    queryKey: postsKey.getPost(req),
    queryFn: async () => {
      const response = await client.posts.getPost(req);

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
