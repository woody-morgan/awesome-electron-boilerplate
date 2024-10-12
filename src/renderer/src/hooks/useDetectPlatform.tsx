import { useMemo } from 'react';

import { convertPlatform } from 'src/main/util/common';

export const useDetectPlatform = () => {
  const platform = useMemo(() => {
    const platform = convertPlatform(window.electron.process.platform);
    if (!platform) {
      throw new Error('Platform not supported');
    }
    return platform;
  }, []);

  return {
    platform,
  };
};
