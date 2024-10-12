import { join } from 'path';

import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { BrowserWindow, app, shell } from 'electron';

import { registerIPC } from './util/registerIPC';
import { bootstrap as backendBootstrap } from '../server/main';

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'default',
    minWidth: 800,
    minHeight: 600,
    resizable: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

async function electronAppInit(backendApp: Awaited<ReturnType<typeof backendBootstrap>>) {
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
      await backendApp.close();
      app.quit();
    }
  });

  app.on('quit', async () => {
    await backendApp.close();
    app.quit();
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  await app.whenReady();

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
    registerIPC(window);
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // In this file you can include the rest of your app"s specific main process
  // code. You can also put them in separate files and require them here.
}

async function boostrap() {
  try {
    // order is important
    // to quit the backend app when the electron app window is closed
    const backendApp = await backendBootstrap();
    await electronAppInit(backendApp);
  } catch (e) {
    console.error(e);
    app.quit();
  }
}

boostrap();
