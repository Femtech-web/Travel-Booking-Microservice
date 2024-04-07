import { IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  customer_id: number;
}
