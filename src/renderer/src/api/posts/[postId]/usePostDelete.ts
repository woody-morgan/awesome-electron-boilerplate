import { useMutation, useQueryClient } from '@tanstack/react-query';
import { match } from 'ts-pattern';

import { client } from '@/api/client';
import { postsKey } from '@/api/posts/query-key';
import { ExtractMutationFromApi } from '@/types/api/react-query';

export function usePostDelete(
  ...[options]: ExtractMutationFromApi<typeof client.posts.deletePost>
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (req) => {
      const res = await client.posts.deletePost(req);

      return match(res)
        .with({ status: 200 }, ({ body }) => {
          return body;
        })
        .otherwise(({ body }) => {
          throw new Error(body.message);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKey.all,
      });
    },
    ...options,
  });

  return mutation;
}
