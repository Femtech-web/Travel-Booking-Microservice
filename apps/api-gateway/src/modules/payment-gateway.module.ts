import { Module } from '@nestjs/common';
import { PaymentGateway } from '../gateways';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule.registerRmq(
      'PAYMENT_SERVICE',
      process.env.RABBITMQ_PAYMENT_QUEUE,
    ),
  ],
  controllers: [PaymentGateway],
})
export class PaymentGatewayModule {}
