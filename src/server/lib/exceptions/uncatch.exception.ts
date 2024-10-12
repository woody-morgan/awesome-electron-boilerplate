import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base/base.exception';
import { UncatchedExceptionCodeEnum } from '../enum/exception.enum';

export class UnCatchedException extends BaseException {
  constructor(message?: string) {
    super(
      UncatchedExceptionCodeEnum.UnCatched,
      HttpStatus.INTERNAL_SERVER_ERROR,
      message || 'Internal Server Error',
    );
  }
}
