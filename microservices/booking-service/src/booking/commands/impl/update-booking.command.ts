import { UpdateBookingDto } from '../../dtos';

export class UpdateBookingCommand {
  constructor(public readonly updateBookingDto: UpdateBookingDto) {}
}
