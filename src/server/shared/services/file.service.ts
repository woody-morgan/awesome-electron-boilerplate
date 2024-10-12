import fs from 'fs';
import path from 'path';

import { O } from '@mobily/ts-belt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor() {}

  public checkExistsSync(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  public readAllFilenameSync(dirPath: string): string[] {
    return fs.statSync(dirPath).isDirectory()
      ? fs.readdirSync(dirPath).flatMap((subFile) => {
          const fullPath = path.join(dirPath, subFile);
          return this.readAllFilenameSync(fullPath);
        })
      : [dirPath];
  }

  public readFileSync(filePath: string): O.Option<string> {
    try {
      // there could be a case where the file is not found or directory. In that case, we should return None
      const data = fs.readFileSync(filePath, 'utf-8');
      return O.Some(data);
    } catch (_) {
      return O.None;
    }
  }

  public readFileSyncWithDefault(filePath: string, defaultValue?: string): string {
    return O.getWithDefault(this.readFileSync(filePath), defaultValue ?? '');
  }

  public writeFileSync({ filePath, data }: { filePath: string; data: string }): void {
    fs.writeFileSync(filePath, data);
  }
}
