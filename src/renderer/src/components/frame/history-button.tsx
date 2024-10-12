import { Flex } from '@radix-ui/themes';
import { ArrowLeftIcon, ArrowRightIcon, Home, RotateCw } from 'lucide-react';
import { FC } from 'react';

import { MAIN_PAGE } from '@/config/const';
import { useTypedRouter } from '@/hooks/useTypedRouter';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

type BackwardButtonProps = Omit<React.ComponentProps<typeof Button>, 'onClick'>;

const ForwardButton: FC<BackwardButtonProps> = ({
  size = 'icon',
  variant = 'ghost',
  className,
  ...props
}) => {
  const { forward } = useTypedRouter();
  return (
    <Flex gap="1" asChild>
      <Button
        size={size}
        variant={variant}
        className={cn('title-bar-none-draggable', className)}
        onClick={() => {
          forward();
        }}
        {...props}
      >
        <ArrowRightIcon className="size-4" />
      </Button>
    </Flex>
  );
};

const BackwardButton: FC<BackwardButtonProps> = ({
  size = 'icon',
  variant = 'ghost',
  className,
  ...props
}) => {
  const { back } = useTypedRouter();
  return (
    <Flex gap="1" asChild>
      <Button
        size={size}
        variant={variant}
        className={cn('title-bar-none-draggable', className)}
        onClick={() => {
          back();
        }}
        {...props}
      >
        <ArrowLeftIcon className="size-4" />
      </Button>
    </Flex>
  );
};

const ReloadButton: FC<BackwardButtonProps> = ({
  size = 'icon',
  variant = 'ghost',
  className,
  ...props
}) => {
  const { reload } = useTypedRouter();
  return (
    <Flex gap="1" asChild>
      <Button
        size={size}
        variant={variant}
        className={cn('title-bar-none-draggable', className)}
        onClick={() => {
          reload();
        }}
        {...props}
      >
        <RotateCw className="size-4" />
      </Button>
    </Flex>
  );
};

const HomeButton: FC<BackwardButtonProps> = ({
  size = 'icon',
  variant = 'ghost',
  className,
  ...props
}) => {
  const { push } = useTypedRouter();
  return (
    <Flex gap="1" asChild>
      <Button
        size={size}
        variant={variant}
        className={cn('title-bar-none-draggable', className)}
        onClick={() => {
          push(MAIN_PAGE);
        }}
        {...props}
      >
        <Home className="size-4" />
      </Button>
    </Flex>
  );
};

export const HistoryButton = {
  Forward: ForwardButton,
  Backward: BackwardButton,
  Reload: ReloadButton,
  Home: HomeButton,
};
