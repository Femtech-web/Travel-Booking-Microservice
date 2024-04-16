import { UpdatePaymentDto } from '../../dtos';

export class UpdatePaymentCommand {
  constructor(public readonly updatePaymentDto: UpdatePaymentDto) {}
}
