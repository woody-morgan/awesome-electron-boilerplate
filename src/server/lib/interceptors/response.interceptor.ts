import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private logger = new Logger(ResponseInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    this.logger.log({
      originalUrl,
      method,
      params,
      query,
      body,
    });

    return next.handle().pipe(
      tap((data) =>
        console.log({
          statusCode,
          data,
        }),
      ),
    );
  }
}
