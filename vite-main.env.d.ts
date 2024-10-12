/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly MAIN_VITE_APP_NAME: string;
  readonly MAIN_VITE_ENABLE_DOCUMENTATION: string;

  readonly MAIN_VITE_SBX_SERVER_REPO_OWNER: string;
  readonly MAIN_VITE_SBX_SERVER_REPO_NAME: string;
  readonly MAIN_VITE_SBX_SERVER_GITHUB_TOKEN: string;
  readonly MAIN_VITE_SBX_SERVER_HOST_NAME: string;

  readonly MAIN_VITE_REDFOX_METADATA_URL: string;
  readonly MAIN_VITE_REDFOX_BUILD_DOWNLOAD_CDN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
