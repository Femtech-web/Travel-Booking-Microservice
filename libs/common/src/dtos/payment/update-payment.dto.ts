import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto {
  id: string;
  updatedPayment: CreatePaymentDto;
}
