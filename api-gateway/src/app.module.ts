import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthGuard } from './guards';
import { HealthModule } from './health/health.module';
import { ConfigurationModule } from './configs/config.module';
import { UtilsModule } from './utils/utils.module';
import {
  AuthGatewayModule,
  UserGatewayModule,
  BookingGatewayModule,
  PaymentGatewayModule,
} from './modules';

@Module({
  imports: [
    AuthGatewayModule,
    UserGatewayModule,
    BookingGatewayModule,
    PaymentGatewayModule,
    ConfigurationModule,
    UtilsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const URL = configService.get('rabbitmq_url');
        const queue = configService.get('authQueue');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${URL}`],
            queue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class ApiGatewayModule {}
