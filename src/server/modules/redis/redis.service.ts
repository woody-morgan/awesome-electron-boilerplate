import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import fs from 'fs';

import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Redis } from 'ioredis';

import { redisServerPath } from '../../../main/util/binary-path';
import { getFileDatabasePath } from '../../../main/util/get-file-path';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {
  logger = new Logger(RedisService.name);
  private server: ChildProcessWithoutNullStreams | undefined;
  private client: Redis | undefined;

  constructor(private readonly port: number) {}
  async onModuleInit() {
    try {
      await this.initializeRedisServer();
      this.client = this.createClient(this.port);
      Logger.log(`Redis server is running on port ${this.port}`);
    } catch (e) {
      Logger.error('Failed to initialize Redis server:', e);
      process.exit(1); // 에러 발생 시 애플리케이션 종료
    }
  }

  onModuleDestroy() {
    if (this.server) {
      this.server.kill();
      Logger.log('Redis server stopped');
    }
    if (this.client) {
      this.client.shutdown();
      Logger.log('Redis client disconnected');
    }
  }

  onApplicationShutdown(signal?: string) {
    Logger.log(`Application is shutting down with signal ${signal}`);
    if (this.server) {
      this.server.kill();
      Logger.log('Redis server stopped');
    }
    if (this.client) {
      this.client.shutdown();
      Logger.log('Redis client disconnected');
    }
  }

  private createClient(port: number, dbIndex?: number): Redis {
    return new Redis(port, {
      db: dbIndex,
    });
  }

  private async initializeRedisServer() {
    const databasePath = getFileDatabasePath();
    fs.mkdirSync(databasePath, { recursive: true });

    return new Promise((resolve, reject) => {
      const client = this.createClient(this.port);

      client.on('ready', () => {
        client.quit();
        resolve(true);
      });

      client.on('error', () => {
        const redisServer = spawn(redisServerPath, [
          '--port',
          this.port.toString(),
          '--appendonly',
          'yes',
          '--dir',
          `${databasePath}`,
          '--appendfilename',
          `appendonly.aof`,
          '--appendfsync',
          'everysec',
        ]);

        redisServer.stdout.on('data', (data) => {
          Logger.log(`stdout: ${data}`);
          if (data.includes('Ready to accept connections')) {
            resolve(true);
          }
        });

        redisServer.stderr.on('data', (data) => {
          Logger.error(`Redis server error: ${data}`);
          reject(data.toString());
        });

        redisServer.on('close', (code) => {
          if (code !== 0) {
            reject(`redis server process exited with code ${code}`);
          }
        });

        this.server = redisServer;
      });
    });
  }
  public getClient() {
    if (!this.client) {
      Logger.error('Redis client is not initialized');
      throw new Error('Redis client is not initialized');
    }
    return this.client;
  }
}
