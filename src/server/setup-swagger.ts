import { type INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { generateOpenApiDocument } from '@shared/contract';

import { ApiConfigService } from './shared/services/config/api-config.service.js';
import { SharedModule } from './shared/shared.module.js';

export async function setupSwagger(app: INestApplication): Promise<void> {
  const configService = app.select(SharedModule).get(ApiConfigService);

  const { port } = configService.appConfig;

  // swagger
  const document = generateOpenApiDocument({
    options: {
      setOperationId: true,
      jsonQuery: true,
    },
  });

  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  Logger.log(`Swagger UI: http://localhost:${port}/documentation`, 'Bootstrap');
}
