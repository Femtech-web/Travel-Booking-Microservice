import { CreatePaymentDto } from './create-payment.dto';
import { ObjectId } from 'mongodb';

export class UpdatePaymentDto {
  id: ObjectId;
  updatedPayment: CreatePaymentDto;
}
