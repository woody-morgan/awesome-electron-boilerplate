import { Flex } from '@radix-ui/themes';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { AsyncBoundary } from '@/components/common/async-boundary';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { pages } from '@/pages';

import { PostCard } from '../post-card';

const Render: FC<{
  postId: string;
}> = ({ postId }) => {
  return (
    <Card className="min-h-60">
      <CardHeader>
        <CardTitle>Make Skeleton Render Pattern Example</CardTitle>
      </CardHeader>
      <CardContent>
        <PostCard.Render postId={postId}>
          {(data) => (
            <Flex direction="column">
              <p className="mb-2 text-2xl font-bold">{data.title}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span>{data.content}</span>
                </div>
              </div>
            </Flex>
          )}
        </PostCard.Render>
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export const PostByIdPage = () => {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    return <pages.error />;
  }

  return (
    <Flex direction="column" className="relative size-full p-6" gap="4">
      <AsyncBoundary
        pendingFallback={
          <Skeleton>
            <PostCard.Skeleton className="h-60 bg-inherit" />
          </Skeleton>
        }
      >
        <Render postId={postId} />
      </AsyncBoundary>
    </Flex>
  );
};
