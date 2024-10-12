import { Flex, Grid } from '@radix-ui/themes';

import { usePostList } from '@/api/posts/usePostList';
import { AsyncBoundary } from '@/components/common/async-boundary';
import { TypedLink } from '@/components/common/typed-link';
import { Skeleton } from '@/components/ui/skeleton';

import { PostCard } from './post-card';

const Render = () => {
  const {
    data: { posts: postList },
  } = usePostList({});

  return (
    <Grid columns="1" gap="6">
      {postList.map((post) => (
        <TypedLink key={post.id} href={`/posts/${post.id}`}>
          <PostCard.Make className="min-h-20" postId={post.id} />
        </TypedLink>
      ))}
    </Grid>
  );
};

export const PostsPage = () => {
  return (
    <Flex direction="column" className="relative h-full w-full p-6" gap="4">
      <AsyncBoundary
        pendingFallback={
          <Grid columns="1" gap="6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={`post-root-skeleton-${i}`}>
                <PostCard.Skeleton className="h-20 bg-inherit" />
              </Skeleton>
            ))}
          </Grid>
        }
      >
        <Render />
      </AsyncBoundary>
    </Flex>
  );
};
