import { GetPaymentDto } from '@app/common';

export class GetPaymentQuery {
  constructor(public readonly getPaymentDto: GetPaymentDto) {}
}
