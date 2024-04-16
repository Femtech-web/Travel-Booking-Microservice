import { CreateBookingDto } from '../../dtos';

export class CreateBookingCommand {
  constructor(public readonly createBookingDto: CreateBookingDto) {}
}
