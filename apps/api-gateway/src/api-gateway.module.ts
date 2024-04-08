import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { CommonModule } from '@app/common';
import { AuthGuard } from './guards';
import { HealthModule } from './health/health.module';
import {
  AuthGatewayModule,
  UserGatewayModule,
  BookingGatewayModule,
  PaymentGatewayModule,
} from './modules';

@Module({
  imports: [
    CommonModule.registerRmq('TOKEN_SERVICE', process.env.RABBITMQ_TOKEN_QUEUE),
    AuthGatewayModule,
    UserGatewayModule,
    BookingGatewayModule,
    PaymentGatewayModule,
    HealthModule,
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ApiGatewayModule {}
