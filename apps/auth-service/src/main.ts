/* eslint-disable prefer-const */

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { CommonService, IQueues } from '@app/common';

import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queueConfig = configService.get<IQueues>('rabbitmqQueues');
  const queue = queueConfig.authQueue;

  app.connectMicroservice(commonService.getRmqOptions(queue));
  app.startAllMicroservices();

  await app.listen(8000);
}
bootstrap();
