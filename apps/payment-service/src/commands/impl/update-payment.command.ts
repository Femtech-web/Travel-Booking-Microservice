import { UpdatePaymentDto } from '@app/common';

export class UpdatePaymentCommand {
  constructor(public readonly updatePaymentDto: UpdatePaymentDto) {}
}
