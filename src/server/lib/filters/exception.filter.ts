import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { format } from 'date-fns';

import { DateFormatEnum } from '../enum/exception.enum';
import { BaseException } from '../exceptions/base/base.exception';
import { UnCatchedException } from '../exceptions/uncatch.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  logger = new Logger(AllExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException || exception instanceof HttpException
        ? exception
        : new UnCatchedException(
            exception instanceof Error ? exception.message : 'Internal Server Error',
          );

    response.status(res.getStatus()).json({
      ...res,
      timestamp: format(new Date(), DateFormatEnum.Datetime),
      path: request.url,
    });
  }
}
