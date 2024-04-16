import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { CommandHandlers } from './commands/handlers';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { QueryHandlers } from './queries/handlers';
import { StripeChargeModule } from './stripeCharge/stripe-charge.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule, CqrsModule, StripeChargeModule],
  controllers: [PaymentController],
  providers: [
    {
      provide: 'BOOKING_SERVICE',
      useFactory: (configService: ConfigService) => {
        const URL = configService.get('rabbitmq_url');
        const queue = configService.get('bookingQueue');

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
    PaymentService,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
})
export class PaymentModule {}
