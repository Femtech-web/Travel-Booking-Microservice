import { IsDate, IsNumber, IsString } from 'class-validator';

export class PaymentModel {
  @IsString()
  id: number;

  @IsString()
  booking_id: string;

  @IsString()
  customer_id: string;

  @IsDate()
  created_at: Date;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  stripe_id: string;

  @IsString()
  stripe_status: string;
}
