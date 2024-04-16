import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { PaymentEntity } from '../../../db/entities/payment.entity';
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
      await this.paymentRepository.update(
        { _id: new ObjectId(id) },
        { booking_id },
      );

      const payment = await this.paymentRepository.findOne({
        where: { _id: new ObjectId(id) },
      });

      return payment;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        error: error,
      });
    }
  }
}
