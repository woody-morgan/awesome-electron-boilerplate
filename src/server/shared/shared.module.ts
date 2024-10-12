import { Global, Module, type Provider } from '@nestjs/common';

import { ApiConfigService } from './services/config/api-config.service.js';
import { FileService } from './services/file.service.js';
import { ParserService } from './services/parser.service.js';
import { StringService } from './services/string.service.js';

const configProviders: Provider[] = [ApiConfigService];

const providers: Provider[] = [
  ParserService,
  ...configProviders,
  // common utils
  FileService,
  StringService,
];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
