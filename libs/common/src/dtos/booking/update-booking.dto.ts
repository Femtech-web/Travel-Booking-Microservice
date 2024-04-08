import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto {
  id: string;
  updatedBooking: CreateBookingDto;
}
