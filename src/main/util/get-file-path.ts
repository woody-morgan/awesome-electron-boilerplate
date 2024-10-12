import path from 'path';

import { app } from 'electron';

import { getNodePlatform } from './get-platform';

export function getResourcePath() {
  const { isPackaged } = app;

  const resourcePath = isPackaged
    ? path.join(process.resourcesPath)
    : path.join(app.getAppPath(), 'resources');

  return resourcePath;
}

export function getBinariesPath() {
  const { isPackaged } = app;

  const binariesPath = isPackaged
    ? path.join(process.resourcesPath, './bin')
    : path.join(app.getAppPath(), 'resources', getNodePlatform()!);

  return binariesPath;
}

export function getFileDatabasePath() {
  const { isPackaged } = app;

  const binariesPath = isPackaged
    ? path.join(process.resourcesPath, './file-db')
    : path.join(app.getAppPath(), 'file-db');

  return binariesPath;
}
