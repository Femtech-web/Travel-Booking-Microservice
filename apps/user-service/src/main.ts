import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CommonService, IQueues } from '@app/common';

import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors();
  app.use(new ValidationPipe());

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queueConfig = configService.get<IQueues>('rabbitmqQueues');
  const queue = queueConfig.userQueue;

  app.connectMicroservice(commonService.getRmqOptions(queue));
  app.startAllMicroservices();

  await app.listen(7000);
}
bootstrap();
