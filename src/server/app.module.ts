import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TsRestModule } from '@ts-rest/nest';

import { LoggerMiddleware } from './lib/middlewares/logger.middleware.js';
import { PostsModule } from './modules/posts/posts.module.js';
import { RedisModule } from './modules/redis/redis.module.js';
import { SharedModule } from './shared/shared.module.js';

@Module({
  imports: [
    TsRestModule.register({
      isGlobal: true,
      // only enable jsonQuery
      jsonQuery: true,
      // validate responses as schema provided
      validateResponses: true,
      validateRequestBody: true,
      validateRequestHeaders: true,
      validateRequestQuery: true,
    }),
    RedisModule.forRoot({ isGlobal: true, port: 6379 }),
    //modules
    PostsModule,
    //shared
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // log all requests on all routes
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
