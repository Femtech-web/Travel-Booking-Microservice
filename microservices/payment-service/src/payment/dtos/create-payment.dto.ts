import { IsEnum, IsNumber, IsString } from 'class-validator';
import { currencies } from '../consts/payment-currencies.const';

class Payment {
  @IsString()
  booking_id: string;

  @IsString()
  customer_id: string;

  @IsNumber()
  amount: number;

  @IsEnum(currencies)
  currency: string;

  @IsString()
  card_token: string;
}

export class CreatePaymentDto {
  newPayment: Payment;
}
