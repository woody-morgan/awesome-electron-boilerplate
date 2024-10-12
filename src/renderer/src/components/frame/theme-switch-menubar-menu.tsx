import { Moon, Sun } from 'lucide-react';
import { FC } from 'react';

import { useTheme } from '@/components/theme-provider';
import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { cn } from '@/lib/utils';

const selectedClass = cn('bg-primary text-primary-foreground');

export const ThemeSwitchMenubarMenu: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <MenubarMenu>
      <MenubarTrigger>
        <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </MenubarTrigger>
      <MenubarContent align="end">
        <MenubarItem
          className={theme === 'light' ? selectedClass : ''}
          onClick={() => setTheme('light')}
        >
          Light
        </MenubarItem>
        <MenubarItem
          className={theme === 'dark' ? selectedClass : ''}
          onClick={() => setTheme('dark')}
        >
          Dark
        </MenubarItem>
        <MenubarItem
          className={theme === 'system' ? selectedClass : ''}
          onClick={() => setTheme('system')}
        >
          System
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
