const extended = import.meta.env as unknown as ImportMetaEnv;

export const env = {
  ...extended,
  VITE_ENABLE_MOCK: extended.VITE_ENABLE_MOCK === 'true',
  VITE_BACKOFFICE_SERVER_ENDPOINT: extended.VITE_BACKOFFICE_SERVER_ENDPOINT || '/api',
} as const satisfies Record<keyof ImportMetaEnv, unknown>;
