import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ApiGatewayModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { rateLimitConfigObject } from './security/configs';
import { TimeoutInterceptor } from './interceptors';
import { ErrorFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  const cookieSecret = configService.get<string>('cookie_secret');
  app.enableCors();
  app.use(cookieParser(cookieSecret));
  app.use(helmet());
  app.use(rateLimit(rateLimitConfigObject));
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new ErrorFilter(httpAdapterHost));

  await app.listen(8000);
}
bootstrap();
