import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { CommonService, IQueues } from '@app/common';

import { TokenModule } from './token.module';

async function bootstrap() {
  const app = await NestFactory.create(TokenModule);

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queueConfig = configService.get<IQueues>('rabbitmqQueues');
  const queue = queueConfig.tokenQueue;

  app.connectMicroservice(commonService.getRmqOptions(queue));
  app.startAllMicroservices();

  await app.listen(7500);
}
bootstrap();
