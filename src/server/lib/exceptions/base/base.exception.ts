import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IBaseException } from '../../interfaces/base.exception.interface';

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, statusCode: number, message: string) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = new Date().toISOString();
    this.path = '';
  }

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp?: string;

  @ApiProperty()
  path?: string;
}
