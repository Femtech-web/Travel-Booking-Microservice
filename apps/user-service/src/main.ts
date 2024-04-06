import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { CommonService, IQueues } from '@app/common';

import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queueConfig = configService.get<IQueues>('rabbitmqQueues');
  const queue = queueConfig.userQueue;

  app.connectMicroservice(commonService.getRmqOptions(queue));
  app.startAllMicroservices();

  await app.listen(5000);
}
bootstrap();
