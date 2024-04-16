import { GetBookingDto } from '../../dtos';

export class GetBookingQuery {
  constructor(public readonly getBookingDto: GetBookingDto) {}
}
