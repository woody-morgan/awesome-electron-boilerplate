import path from 'path';

import { match } from 'ts-pattern';

import { getBinariesPath } from './get-file-path';
import { getNodePlatform } from './get-platform';

// @WARNING: this file should only export path
export const ddbJarPath = path.resolve(path.join(getBinariesPath(), './DynamoDBLocal.jar'));
export const ddbLibPath = path.resolve(path.join(getBinariesPath(), './DynamoDBLocal_lib'));
export const redisCliPath = match(getNodePlatform())
  .with('win', () => path.resolve(path.join(getBinariesPath(), './redis-cli.exe')))
  .with('mac', () => path.resolve(path.join(getBinariesPath(), './redis-cli')))
  .otherwise(() => {
    throw new Error('Unsupported platform');
  });

export const redisServerPath = match(getNodePlatform())
  .with('win', () => path.resolve(path.join(getBinariesPath(), './redis-server.exe')))
  .with('mac', () => path.resolve(path.join(getBinariesPath(), './redis-server')))
  .otherwise(() => {
    throw new Error('Unsupported platform');
  });
