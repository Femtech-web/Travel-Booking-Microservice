import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto {
  id: number;
  updatedBooking: CreateBookingDto;
}
