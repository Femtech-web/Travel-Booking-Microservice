import { DeleteBookingDto } from '../../dtos';

export class DeleteBookingCommand {
  constructor(public readonly deleteBookingDto: DeleteBookingDto) {}
}
