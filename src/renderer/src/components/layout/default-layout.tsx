import { Flex } from '@radix-ui/themes';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import { WindowFrame } from '../frame/window-frame';

export const DefaultLayout: FC = () => {
  return (
    <WindowFrame>
      <Flex className={cn('h-[calc(100vh-28px)] w-full flex-1 overflow-hidden')}>
        <ScrollArea className="relative mx-auto size-full">
          <Outlet />
        </ScrollArea>
      </Flex>
    </WindowFrame>
  );
};
