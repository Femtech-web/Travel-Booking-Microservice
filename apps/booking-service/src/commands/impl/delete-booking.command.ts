import { DeleteBookingDto } from '@app/common';

export class DeleteBookingCommand {
  constructor(public readonly deleteBookingDto: DeleteBookingDto) {}
}
