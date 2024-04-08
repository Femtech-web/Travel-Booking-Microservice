import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { CommonService, IQueues } from '@app/common';

import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queueConfig = configService.get<IQueues>('rabbitmqQueues');
  const queue = queueConfig.paymentQueue;

  app.connectMicroservice(commonService.getRmqOptions(queue));
  app.startAllMicroservices();

  await app.listen(8500);
}
bootstrap();
