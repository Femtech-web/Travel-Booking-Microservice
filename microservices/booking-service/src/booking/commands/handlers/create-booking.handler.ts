import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingCommand } from '../impl';
import { BookingEntity } from '../../../db/entities/booking.entity';

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
    const createdAt = new Date();
    const updatedAt = new Date();
    const bookingData = await this.bookingRepository.create({
      customer_id,
      createdAt,
      updatedAt,
    });

    try {
      return await this.bookingRepository.save(bookingData);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
