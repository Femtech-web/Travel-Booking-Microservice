import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UpdateBookingCommand } from '../impl/update-booking.command';
import { BookingEntity } from '../../../db/entities/booking.entity';

@CommandHandler(UpdateBookingCommand)
export class UpdateBookingHandler
  implements ICommandHandler<UpdateBookingCommand>
{
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  async execute(command: UpdateBookingCommand) {
    const { id, updatedBooking } = command.updateBookingDto;
    const { customer_id } = updatedBooking;
    try {
      await this.bookingRepository.update(
        { _id: new ObjectId(id) },
        { customer_id },
      );

      const booking = await this.bookingRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
      return booking;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
