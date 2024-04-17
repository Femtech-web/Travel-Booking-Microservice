import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import { CreatePaymentCommand } from '../impl';
import { PaymentEntity } from '../../../db/entities/payment.entity';
import { StripeChargeService } from '../../stripeCharge/stripe-charge.service';

const defaultCurrency = 'usd';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    private readonly stripeChargeService: StripeChargeService,
  ) {}

  async execute(command: CreatePaymentCommand) {
    const { newPayment } = command.createPaymentDto;
    const { booking_id, customer_id } = newPayment;

    const payment = this.paymentRepository.create();

    payment.booking_id = booking_id;
    payment.customer_id = customer_id;
    payment.created_at = new Date();
    payment.amount = newPayment.amount;
    payment.currency = defaultCurrency;

    const { id: stripeId, status: stripeStatus } =
      await this.stripeChargeService.createCharge({
        amount: payment.amount,
        currency: defaultCurrency,
        card_token: newPayment.card_token,
        metadata: { booking_id },
      });

    payment.stripe_id = stripeId;
    payment.stripe_status = stripeStatus;

    try {
      await payment.save();
      return payment;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        error: error,
      });
    }
  }
}
