import { UpdateBookingDto } from '@app/common';

export class UpdateBookingCommand {
  constructor(public readonly updateBookingDto: UpdateBookingDto) {}
}
