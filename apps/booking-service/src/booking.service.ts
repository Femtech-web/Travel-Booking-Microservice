import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookingCommand } from './commands/impl';
import { DeleteBookingCommand } from './commands/impl';
import { UpdateBookingCommand } from './commands/impl';
import {
  CreateBookingDto,
  DeleteBookingDto,
  GetBookingDto,
  UpdateBookingDto,
  successResponse,
} from '@app/common';
import { GetBookingQuery } from './queries/impl';
import { BookingEntity } from './entities/booking.entity';

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
