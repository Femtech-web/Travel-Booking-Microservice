import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { DeleteBookingCommand } from '../impl/delete-booking.command';
import { BookingEntity } from '../../entities/booking.entity';

@CommandHandler(DeleteBookingCommand)
export class DeleteBookingHandler
  implements ICommandHandler<DeleteBookingCommand>
{
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  async execute(command: DeleteBookingCommand) {
    const id = command.deleteBookingDto;

    try {
      const customer = await this.bookingRepository.findOne(id);
      await this.bookingRepository.remove(customer);
    } catch (error) {
      throw new InternalServerErrorException(
        `Problem occured when removing a booking: ${error}`,
      );
    }

    return true;
  }
}
