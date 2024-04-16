import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { successResponse } from './interfaces';
import { GetBookingQuery } from './queries/impl';
import { BookingEntity } from '../db/entities/booking.entity';
import {
  DeleteBookingCommand,
  CreateBookingCommand,
  UpdateBookingCommand,
} from './commands/impl';
import {
  CreateBookingDto,
  DeleteBookingDto,
  GetBookingDto,
  UpdateBookingDto,
} from './dtos';

@Injectable()
export class BookingService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getBookingById(getBookingDto: GetBookingDto): Promise<BookingEntity> {
    return this.queryBus.execute(new GetBookingQuery(getBookingDto));
  }

  async createBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<BookingEntity> {
    console.log({ createBookingDto });
    return this.commandBus.execute(new CreateBookingCommand(createBookingDto));
  }

  async updateBooking(
    updateBookingDto: UpdateBookingDto,
  ): Promise<BookingEntity> {
    return this.commandBus.execute(new UpdateBookingCommand(updateBookingDto));
  }

  async deleteBookingById(
    deleteBookingDto: DeleteBookingDto,
  ): Promise<successResponse> {
    return this.commandBus.execute(new DeleteBookingCommand(deleteBookingDto));
  }
}
