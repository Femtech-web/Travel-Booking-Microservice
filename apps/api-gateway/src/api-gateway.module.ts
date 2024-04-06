import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { CommonModule, AuthGuard } from '@app/common';
import { AuthGatewayModule, UserGatewayModule } from './modules';

@Module({
  imports: [
    CommonModule.registerRmq('TOKEN_SERVICE', process.env.RABBITMQ_TOKEN_QUEUE),
    // CommonModule.registerRmq(
    //   'MAILER_SERVICE',
    //   process.env.RABBITMQ_MAILER_QUEUE,
    // ),
    AuthGatewayModule,
    UserGatewayModule,
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
