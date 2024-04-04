import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { validateServerError } from './helpers';

/**
 * A Nest.js filter that catches errors throws appriopriate exceptions
 */
@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let statusCode;
    let errorResponse;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const { code, message } = validateServerError();

      statusCode = code;
      errorResponse = message;
    } else {
      statusCode = status;
      errorResponse = error.getResponse();
    }

    return response.status(status).json({
      statusCode,
      errorResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
