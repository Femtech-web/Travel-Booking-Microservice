import { CreateBookingDto } from './create-booking.dto';
import { ObjectId } from 'mongodb';

export class UpdateBookingDto {
  id: ObjectId;
  updatedBooking: CreateBookingDto;
}
