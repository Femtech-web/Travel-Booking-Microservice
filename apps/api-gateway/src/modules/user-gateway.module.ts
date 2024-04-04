import { Module } from '@nestjs/common';
import { UserGateway } from '../gateways';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule.registerRmq('USER_SERVICE', process.env.RABBITMQ_USER_QUEUE),
  ],
  controllers: [UserGateway],
})
export class UserGatewayModule {}
