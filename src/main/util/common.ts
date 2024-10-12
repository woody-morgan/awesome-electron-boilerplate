import { O } from '@mobily/ts-belt';

export const SUPPORTED_PLATFORMS = ['mac', 'win'] as const;
export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number];

// @WARN: this function is dependent on electron-builder's platform names
// should not be used for other purposes
// @TODO: make safe convert function, like safeParse in zod or getSafe abbreviation like ts-belt
export const convertPlatform = (platform: string): O.Option<SupportedPlatform> => {
  switch (platform) {
    case 'darwin':
    case 'sunos':
      return 'mac';
    case 'win32':
      return 'win';
    case 'aix':
    case 'freebsd':
    case 'linux':
    case 'openbsd':
    case 'android':
      // linux platform
      return O.None;
    default:
      return O.None;
  }
};
