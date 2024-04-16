import { CreateBookingHandler } from './create-booking.handler';
import { UpdateBookingHandler } from './update-booking.handler';
import { DeleteBookingHandler } from './delete-booking.handler';

export const CommandHandlers = [
  CreateBookingHandler,
  UpdateBookingHandler,
  DeleteBookingHandler,
];
