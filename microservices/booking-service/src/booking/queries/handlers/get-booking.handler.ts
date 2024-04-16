import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetBookingQuery } from '../impl';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BookingEntity } from '../../../db/entities/booking.entity';

@QueryHandler(GetBookingQuery)
export class GetBookingHandler implements IQueryHandler<GetBookingQuery> {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  async execute(query: GetBookingQuery) {
    const { id } = query.getBookingDto;
    const booking = await this.bookingRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!booking) {
      throw (
        (new NotFoundException(),
        {
          statusCode: 404,
          errorStatus: 'Booking does not exist',
        })
      );
    }

    return booking;
  }
}
