import { Module } from '@nestjs/common';
import { AuthGateway } from '../gateways';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
  ],
  controllers: [AuthGateway],
})
export class AuthGatewayModule {}
