import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './commands/handlers';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { QueryHandlers } from './queries/handlers';
import { CommonModule } from '@app/common';
import { PaymentEntity } from './entities/payment.entity';
import { StripeChargeModule } from './stripeCharge/stripe-charge.module';

@Module({
  imports: [
    CommonModule.registerRmq(
      'BOOKING_SERVICE',
      process.env.RABBITMQ_BOOKING_QUEUE,
    ),
    TypeOrmModule.forFeature([PaymentEntity]),
    CqrsModule,
    StripeChargeModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, ...QueryHandlers, ...CommandHandlers],
})
export class PaymentModule {}
