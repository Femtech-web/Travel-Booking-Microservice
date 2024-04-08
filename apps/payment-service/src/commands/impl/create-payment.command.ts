import { CreatePaymentDto } from '@app/common';

export class CreatePaymentCommand {
  constructor(public readonly createPaymentDto: CreatePaymentDto) {}
}
