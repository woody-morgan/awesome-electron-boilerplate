import { Flex } from '@radix-ui/themes';
import { FC } from 'react';

import { cn } from '@/lib/utils';

type FlexProps = React.ComponentProps<typeof Flex>;

export const Center: FC<FlexProps> = ({
  children,
  align = 'center',
  justify = 'center',
  className,
  ...props
}) => {
  return (
    <Flex align={align} justify={justify} className={cn('h-full w-full', className)} {...props}>
      {children}
    </Flex>
  );
};
