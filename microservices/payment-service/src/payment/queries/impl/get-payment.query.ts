import { GetPaymentDto } from '../../dtos';

export class GetPaymentQuery {
  constructor(public readonly getPaymentDto: GetPaymentDto) {}
}
