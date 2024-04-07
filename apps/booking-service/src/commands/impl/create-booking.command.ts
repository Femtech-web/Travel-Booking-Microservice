import { CreateBookingDto } from '@app/common';

export class CreateBookingCommand {
  constructor(public readonly createBookingDto: CreateBookingDto) {}
}
