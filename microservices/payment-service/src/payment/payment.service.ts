import { Injectable, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';

import { CreatePaymentCommand, UpdatePaymentCommand } from './commands/impl';
import { GetPaymentQuery } from './queries/impl';
import { PaymentEntity } from '../db/entities/payment.entity';
import { CommonService } from '../utils/common';
import { CreatePaymentDto, GetPaymentDto, UpdatePaymentDto } from './dtos';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('BOOKING_SERVICE') private readonly bookingService: ClientProxy,
    private readonly commonService: CommonService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getPaymentById(getPaymentDto: GetPaymentDto): Promise<PaymentEntity> {
    return this.queryBus.execute(new GetPaymentQuery(getPaymentDto));
  }

  //TODO: getPaymentsByCustomerId
  //TODO: getPaymentsByBookingId

  async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentEntity> {
    const { newPayment } = createPaymentDto;
    const { booking_id } = newPayment;

    const booking = await this.commonService.sendEvent(
      this.bookingService,
      { cmd: 'get-booking' },
      { id: booking_id },
    );

    if (!booking) {
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Booking does not exist',
      });
    }

    return this.commandBus.execute(new CreatePaymentCommand(createPaymentDto));
  }

  async updatePayment(
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentEntity> {
    const { updatedPayment } = updatePaymentDto;
    const { newPayment } = updatedPayment;
    const { booking_id } = newPayment;

    const booking = await this.commonService.sendEvent(
      this.bookingService,
      { cmd: 'get-booking' },
      { id: booking_id },
    );

    if (!booking) {
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Booking does not exist',
      });
    }
    return this.commandBus.execute(new UpdatePaymentCommand(updatePaymentDto));
  }
}
