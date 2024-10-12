import { Flex } from '@radix-ui/themes';
import { FC } from 'react';

import { cn } from '@/lib/utils';

type FlexProps = React.ComponentProps<typeof Flex>;
export const Spinner: FC<FlexProps> = ({
  direction = 'column',
  display = 'inline-flex',
  align = 'center',
  justify = 'center',
  className,
  ...props
}) => {
  return (
    <Flex
      direction={direction}
      display={display}
      align={align}
      justify={justify}
      className={cn('size-full', className)}
      {...props}
    >
      <div className="size-8 animate-spin rounded-full border-4 border-gray-500 border-t-transparent" />
    </Flex>
  );
};
