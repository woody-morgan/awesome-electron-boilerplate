import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), swcPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared'),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
      },
    },
    plugins: [react(), tsconfigPaths()],
  },
});
