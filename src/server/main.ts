import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module.js';
import { AllExceptionFilter } from './lib/filters/exception.filter.js';
import { setupSwagger } from './setup-swagger.js';
import { ApiConfigService } from './shared/services/config/api-config.service.js';
import { SharedModule } from './shared/shared.module.js';

export async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    cors: true,
    bufferLogs: true,
    forceCloseConnections: true,
  });

  app.use(helmet());
  // app.setGlobalPrefix('/api'); use api as global prefix
  app.use(compression());
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());
  // load config
  const apiConfigService = app.select(SharedModule).get(ApiConfigService);

  if (apiConfigService.documentationEnabled) {
    setupSwagger(app);
  }

  if (!apiConfigService.isDevelopment) {
    app.enableShutdownHooks();
  }

  // start server
  const port = apiConfigService.appConfig.port;
  await app.listen(port);

  Logger.log(`server running on ${await app.getUrl()}`, 'Bootstrap');

  return app;
}
