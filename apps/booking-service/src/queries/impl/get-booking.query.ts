import { GetBookingDto } from '@app/common';

export class GetBookingQuery {
  constructor(public readonly getBookingDto: GetBookingDto) {}
}
