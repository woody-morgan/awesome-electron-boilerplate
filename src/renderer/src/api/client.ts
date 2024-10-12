import { initClient } from '@ts-rest/core';

import { env } from '@/config/env';
import { contract } from '@shared/contract';

// @TODO: make this as an environment variable
const BASE_URL = `http://localhost:${env.VITE_PORT}`;

export const client = initClient(contract, {
  baseUrl: BASE_URL,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
});
