import { initContract } from '@ts-rest/core';
import { generateOpenApi } from '@ts-rest/open-api';

import { postContract } from './posts';
import packageJson from '../../../package.json';

const c = initContract();

export const contract = c.router(
  {
    posts: postContract,
  },
  {
    // @WARN: to prevent too much status code on client
    strictStatusCodes: true,
    /**
     *
     * @link file://./../../server/lib/filters/exception.filter.ts
     */
    commonResponses: {
      500: c.type<{
        errorCode: string;
        statusCode: number;
        message: string;
        // @INFO: below field are added by exception filter for all exceptions
        timestamp: string;
        path: string;
      }>(),
    },
  },
);

export const generateOpenApiDocument = ({
  apiDoc = {
    info: {
      title: 'Awesome Electron Boilerplate API',
      version: packageJson.version,
    },
  },
  options,
}: {
  apiDoc?: Parameters<typeof generateOpenApi>[1];
  options?: Parameters<typeof generateOpenApi>[2];
}) => {
  const document = generateOpenApi(contract, apiDoc, options);

  return document;
};
