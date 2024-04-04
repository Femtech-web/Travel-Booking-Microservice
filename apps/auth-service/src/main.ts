/* eslint-disable prefer-const */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CommonService, IQueues } from '@app/common';

import { AuthModule } from './auth.module';

const logger = new Logger('UserMicroservice');

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.enableCors();
  app.use(new ValidationPipe());

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queueConfig = configService.get<IQueues>('rabbitmqQueues');
  const queue = queueConfig.authQueue;

  app.connectMicroservice(commonService.getRmqOptions(queue));
  app.startAllMicroservices();

  await app.listen(6000);
  logger.log(`UserMicroservice is listening on port ${6000}`);
}
bootstrap();
