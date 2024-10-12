import fs from 'fs';

import { BrowserWindow, dialog, ipcMain, shell } from 'electron';

export type IPCEvent =
  | 'window-minimize'
  | 'window-maximize'
  | 'window-toggle-maximize'
  | 'window-close'
  | 'web-undo'
  | 'web-redo'
  | 'web-cut'
  | 'web-copy'
  | 'web-paste'
  | 'web-delete'
  | 'web-select-all'
  | 'web-reload'
  | 'web-force-reload'
  | 'web-toggle-devtools'
  | 'web-actual-size'
  | 'web-zoom-in'
  | 'web-zoom-out'
  | 'web-toggle-fullscreen'
  | 'open-url'
  | 'open-file'
  | 'download-file';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function registIPCEvent(event: IPCEvent, callback: (...args: any[]) => void) {
  // prevent the event from being registered multiple times
  ipcMain.removeHandler(event);
  ipcMain.handle(event, callback);
}

export const registerIPC = (mainWindow: BrowserWindow) => {
  registIPCEvent('window-minimize', () => {
    mainWindow.minimize();
  });

  registIPCEvent('window-maximize', () => {
    mainWindow.maximize();
  });

  registIPCEvent('window-toggle-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  registIPCEvent('window-close', () => {
    mainWindow.close();
  });

  registIPCEvent('web-undo', () => {
    mainWindow.webContents.undo();
  });

  registIPCEvent('web-redo', () => {
    mainWindow.webContents.redo();
  });

  registIPCEvent('web-cut', () => {
    mainWindow.webContents.cut();
  });

  registIPCEvent('web-copy', () => {
    mainWindow.webContents.copy();
  });

  registIPCEvent('web-paste', () => {
    mainWindow.webContents.paste();
  });

  registIPCEvent('web-delete', () => {
    mainWindow.webContents.delete();
  });

  registIPCEvent('web-select-all', () => {
    mainWindow.webContents.selectAll();
  });

  registIPCEvent('web-reload', () => {
    mainWindow.webContents.reload();
  });

  registIPCEvent('web-force-reload', () => {
    mainWindow.webContents.reloadIgnoringCache();
  });

  registIPCEvent('web-toggle-devtools', () => {
    mainWindow.webContents.toggleDevTools();
  });

  registIPCEvent('web-actual-size', () => {
    mainWindow.webContents.setZoomLevel(0);
  });

  registIPCEvent('web-zoom-in', () => {
    mainWindow.webContents.setZoomLevel(mainWindow.webContents.zoomLevel + 0.5);
  });

  registIPCEvent('web-zoom-out', () => {
    mainWindow.webContents.setZoomLevel(mainWindow.webContents.zoomLevel - 0.5);
  });

  registIPCEvent('web-toggle-fullscreen', () => {
    mainWindow.setFullScreen(!mainWindow.fullScreen);
  });

  registIPCEvent('open-url', (_, url) => {
    shell.openExternal(url);
  });

  registIPCEvent('open-file', (_, path: string) => {
    shell.openPath(path);
  });

  registIPCEvent('download-file', (_, url: string) => {
    const savePath = dialog.showSaveDialogSync({
      defaultPath: url.split('/').pop(),
    });

    if (savePath) {
      fs.copyFileSync(url, savePath);
    }
  });
};
