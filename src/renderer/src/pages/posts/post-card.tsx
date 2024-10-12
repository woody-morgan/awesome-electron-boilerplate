import { User } from 'lucide-react';
import { ComponentPropsWithoutRef, FC, PropsWithChildren } from 'react';

import { usePost } from '@/api/posts/usePost';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PostSchema } from '@shared/contract/posts/schema';

const Skeleton: FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ children, className }) => {
  return <Card className={cn('overflow-hidden', className)}>{children}</Card>;
};

const Render: FC<{
  postId: string;
  children?: (data: PostSchema) => JSX.Element;
}> = ({ postId, children }) => {
  const { data } = usePost({
    params: {
      postId,
    },
  });

  return children ? (
    children(data)
  ) : (
    <>
      <h2 className="mb-2 text-2xl font-bold">{data.title}</h2>
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <User className="mr-1 h-4 w-4" />
          <span>{data.content}</span>
        </div>
      </div>
    </>
  );
};

const Make: FC<
  {
    postId: string;
  } & ComponentPropsWithoutRef<typeof Skeleton>
> = ({ postId, ...skeletonProps }) => {
  return (
    <Skeleton {...skeletonProps}>
      <CardContent className="p-4">
        <Render postId={postId} />
      </CardContent>
    </Skeleton>
  );
};

export const PostCard = {
  Skeleton,
  Render,
  Make,
};
