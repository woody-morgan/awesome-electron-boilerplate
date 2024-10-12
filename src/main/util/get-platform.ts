import { platform } from 'os';

import { convertPlatform } from './common';

export const getNodePlatform = () => {
  return convertPlatform(platform());
};
