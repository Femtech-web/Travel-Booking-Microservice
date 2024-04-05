import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { CommonService, IQueues } from '@app/common';

import { MailerModule } from './mailer.module';

async function bootstrap() {
  const app = await NestFactory.create(MailerModule);

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queueConfig = configService.get<IQueues>('rabbitmqQueues');
  const queue = queueConfig.mailerQueue;

  app.connectMicroservice(commonService.getRmqOptions(queue));
  app.startAllMicroservices();
  await app.listen(8000);
}
bootstrap();
