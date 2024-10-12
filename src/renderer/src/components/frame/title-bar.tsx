import { Flex } from '@radix-ui/themes';
import { memo } from 'react';
import { match } from 'ts-pattern';

import { Menubar } from '@/components/ui/menubar';
import { useDetectPlatform } from '@/hooks/useDetectPlatform';
import { useIPC } from '@/hooks/useIPC';

import { HistoryButton } from './history-button';
import { SettingsMenubarMenu } from './setting-menubar-menu';
import { ThemeSwitchMenubarMenu } from './theme-switch-menubar-menu';
import { MacOSButton, WinOSButton } from '../ui/button/os-button';

const MenuContent = memo(() => {
  return (
    <Flex align="center" className="title-bar-none-draggable">
      <Menubar className="h-full border-none bg-inherit">
        <ThemeSwitchMenubarMenu />
        <SettingsMenubarMenu />
      </Menubar>
    </Flex>
  );
});
MenuContent.displayName = 'title-bar-menu-content';

export const Titlebar = () => {
  const { minimize, close, toggleMaximize } = useIPC();
  const { platform } = useDetectPlatform();

  return (
    <>
      {match(platform)
        .with('mac', () => (
          <Flex
            position="fixed"
            justify="between"
            className="title-bar-draggable z-[9999] h-7 w-full select-none bg-secondary px-2 text-secondary-foreground"
          >
            <Flex align="center" gap="3">
              <Flex
                className="title-bar-none-draggable h-full"
                justify="center"
                align="center"
                gap="4px"
              >
                <MacOSButton kind="close" onClick={close} />
                <MacOSButton kind="minimize" onClick={minimize} />
                <MacOSButton kind="maximize" onClick={toggleMaximize} />
              </Flex>
              <Flex align="center">
                <HistoryButton.Backward />
                <HistoryButton.Forward />
                <HistoryButton.Reload />
              </Flex>
            </Flex>

            <MenuContent />
          </Flex>
        ))
        .with('win', () => (
          <Flex
            position="fixed"
            justify="between"
            align="center"
            className="title-bar-draggable z-[9999] h-7 w-full select-none bg-secondary px-2 text-secondary-foreground"
          >
            <MenuContent />
            <Flex
              className="title-bar-none-draggable h-full"
              justify="center"
              align="center"
              gap="2px"
            >
              <Flex gap="1">
                <HistoryButton.Backward />
                <HistoryButton.Forward />
                <HistoryButton.Reload />
              </Flex>
              <WinOSButton kind="minimize" onClick={minimize} />
              <WinOSButton kind="maximize" onClick={toggleMaximize} />
              <WinOSButton kind="close" onClick={close} />
            </Flex>
          </Flex>
        ))
        .exhaustive()}
    </>
  );
};
