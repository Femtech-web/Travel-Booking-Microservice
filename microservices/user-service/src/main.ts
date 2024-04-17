import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { microserviceOptions } from './configs/microservice-connection.config';

const logger = new Logger('AuthMicroservice');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(microserviceOptions);
  app.startAllMicroservices();

  await app.listen(8002);
  logger.log('Microservice is listening');
}
bootstrap();
