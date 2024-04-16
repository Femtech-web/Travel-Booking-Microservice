import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { GetPaymentQuery } from '../impl';
import { PaymentEntity } from '../../../db/entities/payment.entity';

@QueryHandler(GetPaymentQuery)
export class GetPaymentHandler implements IQueryHandler<GetPaymentQuery> {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async execute(query: GetPaymentQuery) {
    const { id } = query.getPaymentDto;
    const payment = await this.paymentRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!payment) {
      throw new RpcException({
        statusCode: 500,
        errorStatus: 'Payment does not exist',
      });
    }

    return payment;
  }
}
