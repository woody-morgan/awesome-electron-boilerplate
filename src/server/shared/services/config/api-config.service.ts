import { O } from '@mobily/ts-belt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiConfigService {
  constructor() {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV ?? 'development';
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('MAIN_VITE_ENABLE_DOCUMENTATION');
  }

  get appConfig() {
    return {
      port: this.getNumber('VITE_PORT'),
      appName: this.getString('MAIN_VITE_APP_NAME'),
    };
  }

  private get(key: string): string {
    //@TODO: define env key type
    const value = import.meta.env[key];

    if (O.isNone(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
