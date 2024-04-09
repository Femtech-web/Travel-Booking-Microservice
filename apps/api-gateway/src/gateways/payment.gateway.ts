import {
  Body,
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import {
  CommonService,
  GetPaymentDto,
  CreatePaymentDto,
  CurrentUser,
} from '@app/common';
import { PaymentModel } from '../models';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api/payment')
export class PaymentGateway {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentService: ClientProxy,
    private readonly commonService: CommonService,
  ) {}

  @Get('/:id')
  async GetPaymentById(
    @Param() paymentDto: GetPaymentDto,
  ): Promise<PaymentModel> {
    return await this.commonService.sendEvent(
      this.paymentService,
      { cmd: 'get-payment' },
      { ...paymentDto },
    );
  }

  @Post('/')
  async CreatePayment(
    @Body() newPayment: CreatePaymentDto,
  ): Promise<PaymentModel> {
    return await this.commonService.sendEvent(
      this.paymentService,
      { cmd: 'create-payment' },
      { ...newPayment },
    );
  }

  @Put('/')
  async UpdatePayment(
    @CurrentUser() id: string,
    @Body() updatedPayment: CreatePaymentDto,
  ): Promise<PaymentModel> {
    return await this.commonService.sendEvent(
      this.paymentService,
      { cmd: 'update-payment' },
      { updatedPayment, id },
    );
  }
}
