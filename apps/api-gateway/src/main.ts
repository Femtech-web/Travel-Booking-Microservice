import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { rateLimitConfigObject } from './security/configs';
import { TimeoutInterceptor } from './interceptors';
import { ErrorFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  const cookieSecret = configService.get<string>('cookie_secret');
  app.enableCors();
  app.use(cookieParser(cookieSecret));
  app.use(helmet());
  app.use(rateLimit(rateLimitConfigObject));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(5000);
}
bootstrap();
