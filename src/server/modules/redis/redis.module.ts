import { DynamicModule, Module } from '@nestjs/common';

import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static forRoot({ port, isGlobal = false }: { port: number; isGlobal: boolean }): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: RedisService,
          useFactory: () => new RedisService(port),
        },
      ],
      exports: [RedisService],
      global: isGlobal,
    };
  }
}
