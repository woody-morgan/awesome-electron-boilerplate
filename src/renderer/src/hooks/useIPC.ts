import { useCallback } from 'react';

import { IPCEvent } from '../../../main/util/registerIPC';

export const useIPC = () => {
  const invokeIPC = useCallback((channel: IPCEvent, args?: unknown) => {
    window.electron.ipcRenderer.invoke(channel, args);
  }, []);

  const maximize = useCallback(() => {
    invokeIPC('window-maximize');
  }, [invokeIPC]);

  const minimize = useCallback(() => {
    invokeIPC('window-minimize');
  }, [invokeIPC]);

  const close = useCallback(() => {
    invokeIPC('window-close');
  }, [invokeIPC]);

  const toggleMaximize = useCallback(() => {
    invokeIPC('window-toggle-maximize');
  }, [invokeIPC]);

  const downloadFile = useCallback(
    (filename: string) => {
      invokeIPC('download-file', filename);
    },
    [invokeIPC],
  );

  const openFile = useCallback(
    (filename: string) => {
      invokeIPC('open-file', filename);
    },
    [invokeIPC],
  );

  return { invokeIPC, maximize, minimize, close, toggleMaximize, downloadFile, openFile };
};
