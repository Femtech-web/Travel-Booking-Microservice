import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { CommonService, IQueues } from '@app/common';

import { BookingModule } from './booking.module';

async function bootstrap() {
  const app = await NestFactory.create(BookingModule);

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queueConfig = configService.get<IQueues>('rabbitmqQueues');
  const queue = queueConfig.bookingQueue;

  app.connectMicroservice(commonService.getRmqOptions(queue));
  app.startAllMicroservices();

  await app.listen(6000);
}
bootstrap();
