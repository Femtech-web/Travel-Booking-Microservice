import { Module } from '@nestjs/common';
import { BookingGateway } from '../gateways';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule.registerRmq(
      'BOOKING_SERVICE',
      process.env.RABBITMQ_BOOKING_QUEUE,
    ),
  ],
  controllers: [BookingGateway],
})
export class BookingGatewayModule {}
