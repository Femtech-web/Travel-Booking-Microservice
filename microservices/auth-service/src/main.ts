import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { microserviceOptions } from './configs/microservice-connection.config';

const logger = new Logger('AuthMicroservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  await app.listen();
  logger.log('Microservice is listening');
}
bootstrap();
