import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { PaymentService } from './payment.service';
import { PaymentEntity } from './entities/payment.entity';
import { GetPaymentDto, CreatePaymentDto, UpdatePaymentDto } from '@app/common';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ cmd: 'get-payment' })
  async getPaymentById(getPaymentDto: GetPaymentDto): Promise<PaymentEntity> {
    return this.paymentService.getPaymentById(getPaymentDto);
  }

  @MessagePattern({ cmd: 'create-payment' })
  async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @MessagePattern({ cmd: 'update-payment' })
  async updatePayment(
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.updatePayment(updatePaymentDto);
  }
}
