import { Settings } from 'lucide-react';
import { FC } from 'react';

import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIPC } from '@/hooks/useIPC';

export const SettingsMenubarMenu: FC = () => {
  const { invokeIPC } = useIPC();

  return (
    <MenubarMenu>
      <MenubarTrigger>
        <Settings className="size-4" />
      </MenubarTrigger>
      <MenubarContent>
        <ScrollArea className="w-full">
          {import.meta.env.DEV && (
            <MenubarItem
              onClick={() => {
                invokeIPC('web-toggle-devtools');
              }}
            >
              Chrome Devtools <MenubarShortcut>F12</MenubarShortcut>
            </MenubarItem>
          )}
        </ScrollArea>
      </MenubarContent>
    </MenubarMenu>
  );
};
