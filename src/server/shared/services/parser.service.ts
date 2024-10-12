import path from 'path';

import { A, G, O, S, flow } from '@mobily/ts-belt';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { FileService } from './file.service';

@Injectable()
export class ParserService {
  constructor(@Inject(forwardRef(() => FileService)) private readonly fileService: FileService) {}

  public parseAsJson = (data: string): O.Option<Record<string, unknown>> => {
    try {
      const parsedData = JSON.parse(data);

      if (!G.isObject(parsedData)) {
        return O.None;
      }

      return O.Some(parsedData);
    } catch (error) {
      return O.None;
    }
  };

  public parseAsJsonWithDefault = (data: string, defaultValue: Record<string, unknown> = {}) =>
    O.getWithDefault(this.parseAsJson(data), defaultValue);

  public parseLogFiles = (logExtension: string = '.log') =>
    flow(
      A.keep(S.endsWith(logExtension)),
      A.map((file) => {
        const fileContent = this.fileService.readFileSync(file);
        return fileContent ? S.split(fileContent, '\n') : [];
      }),
      A.flat,
      A.map((log) => JSON.stringify(log)),
    );

  public parseFileNameFromPath = (filePath: string) => path.basename(filePath);
}
