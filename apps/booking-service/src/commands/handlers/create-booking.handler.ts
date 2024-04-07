import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingCommand } from '../impl';
import { BookingEntity } from '../../entities/booking.entity';

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler
  implements ICommandHandler<CreateBookingCommand>
{
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  async execute(command: CreateBookingCommand) {
    const { customer_id } = command.createBookingDto;
    const booking = await this.bookingRepository.create();

    booking.customer_id = customer_id;
    booking.date = new Date();

    try {
      await booking.save();
      return booking;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
