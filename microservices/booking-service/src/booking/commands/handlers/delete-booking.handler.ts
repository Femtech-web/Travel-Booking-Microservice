import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InternalServerErrorException } from '@nestjs/common';
import { DeleteBookingCommand } from '../impl/delete-booking.command';
import { BookingEntity } from '../../../db/entities/booking.entity';

@CommandHandler(DeleteBookingCommand)
export class DeleteBookingHandler
  implements ICommandHandler<DeleteBookingCommand>
{
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  async execute(command: DeleteBookingCommand) {
    const { id } = command.deleteBookingDto;

    try {
      const booking = await this.bookingRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
      await this.bookingRepository.remove(booking);
      return { response: 'booking deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        `Problem occurred when removing a booking: ${error}`,
      );
    }

    return true;
  }
}
