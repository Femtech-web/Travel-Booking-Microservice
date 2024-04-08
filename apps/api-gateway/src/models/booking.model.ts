import { IsDate, IsString } from 'class-validator';

export class BookingModel {
  @IsString()
  id: StringConstructor;

  @IsString()
  customer_id: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
