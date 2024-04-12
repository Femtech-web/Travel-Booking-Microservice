import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { HttpAdapterHost } from '@nestjs/core';

import { validateServerError } from './helpers';

/**
 * A Nest.js filter that catches errors throws appropriate exceptions
 */

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status;
    let message;

    console.log(error);
    if (error instanceof HttpException) {
      status = error.getStatus();
      message = error.getResponse();
    } else if (error instanceof RpcException) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = error.message;
    } else {
      const { code, message: msg } = validateServerError();
      status = code;
      message = msg;
    }

    const httpAdapter = this.httpAdapterHost.httpAdapter;
    httpAdapter.reply(
      response,
      {
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      status,
    );
  }
}
