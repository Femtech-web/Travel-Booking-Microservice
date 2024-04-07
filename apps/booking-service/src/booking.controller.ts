import { Controller } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { BookingService } from './booking.service';
import { MessagePattern } from '@nestjs/microservices';
import { BookingEntity } from './entities/booking.entity';
import {
  GetBookingDto,
  CreateBookingDto,
  UpdateBookingDto,
  DeleteBookingDto,
} from '@app/common';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern({ cmd: 'get-booking' })
  async getBookingById(
    @Body() getBookingDto: GetBookingDto,
  ): Promise<BookingEntity> {
    return this.bookingService.getBookingById(getBookingDto);
  }

  @MessagePattern({ cmd: 'create-booking' })
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<BookingEntity> {
    return this.bookingService.createBooking(createBookingDto);
  }

  @MessagePattern({ cmd: 'update-booking' })
  async updateBooking(
    @Body() getBookingDto: UpdateBookingDto,
  ): Promise<BookingEntity> {
    return this.bookingService.updateBooking(getBookingDto);
  }

  @MessagePattern({ cmd: 'delete-booking' })
  async deleteBookingById(
    @Body() deleteBookingDto: DeleteBookingDto,
  ): Promise<boolean> {
    return this.bookingService.deleteBookingById(deleteBookingDto);
  }
}
