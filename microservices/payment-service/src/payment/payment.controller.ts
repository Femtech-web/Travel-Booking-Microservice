import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';

import { PaymentService } from './payment.service';
import { CommonService } from '../utils/common';
import { PaymentEntity } from '../db/entities/payment.entity';
import { GetPaymentDto, CreatePaymentDto, UpdatePaymentDto } from './dtos';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'get-payment' })
  async getPaymentById(
    @Payload() getPaymentDto: GetPaymentDto,
    @Ctx() context: RmqContext,
  ): Promise<PaymentEntity> {
    this.commonService.acknowledgeMessage(context);

    return this.paymentService.getPaymentById(getPaymentDto);
  }

  @MessagePattern({ cmd: 'create-payment' })
  async createPayment(
    @Payload() createPaymentDto: CreatePaymentDto,
    @Ctx() context: RmqContext,
  ): Promise<PaymentEntity> {
    this.commonService.acknowledgeMessage(context);

    return this.paymentService.createPayment(createPaymentDto);
  }

  @MessagePattern({ cmd: 'update-payment' })
  async updatePayment(
    @Payload() updatePaymentDto: UpdatePaymentDto,
    @Ctx() context: RmqContext,
  ): Promise<PaymentEntity> {
    this.commonService.acknowledgeMessage(context);

    return this.paymentService.updatePayment(updatePaymentDto);
  }
}
