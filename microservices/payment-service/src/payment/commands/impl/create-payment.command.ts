import { CreatePaymentDto } from '../../dtos';

export class CreatePaymentCommand {
  constructor(public readonly createPaymentDto: CreatePaymentDto) {}
}
