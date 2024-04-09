import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { PaymentEntity } from '../../entities/payment.entity';
import { UpdatePaymentCommand } from '../impl';

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler
  implements ICommandHandler<UpdatePaymentCommand>
{
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async execute(command: UpdatePaymentCommand) {
    const { id, updatedPayment } = command.updatePaymentDto;
    const { newPayment } = updatedPayment;
    const { booking_id } = newPayment;

    try {
      await this.paymentRepository.update({ id }, { booking_id });

      const payment = await this.paymentRepository.findOne({ where: { id } });

      return payment;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
