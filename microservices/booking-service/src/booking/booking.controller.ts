import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingEntity } from '../db/entities/booking.entity';
import { successResponse } from './interfaces';
import { CommonService } from '../utils/common';
import {
  CreateBookingDto,
  DeleteBookingDto,
  GetBookingDto,
  UpdateBookingDto,
} from './dtos';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'get-booking' })
  async getBookingById(
    @Payload() getBookingDto: GetBookingDto,
    @Ctx() context: RmqContext,
  ): Promise<BookingEntity> {
    this.commonService.acknowledgeMessage(context);

    return this.bookingService.getBookingById(getBookingDto);
  }

  @MessagePattern({ cmd: 'create-booking' })
  async createBooking(
    @Payload() createBookingDto: CreateBookingDto,
    @Ctx() context: RmqContext,
  ): Promise<BookingEntity> {
    this.commonService.acknowledgeMessage(context);

    return this.bookingService.createBooking(createBookingDto);
  }

  @MessagePattern({ cmd: 'update-booking' })
  async updateBooking(
    @Payload() updateBookingDto: UpdateBookingDto,
    @Ctx() context: RmqContext,
  ): Promise<BookingEntity> {
    this.commonService.acknowledgeMessage(context);

    return this.bookingService.updateBooking(updateBookingDto);
  }

  @MessagePattern({ cmd: 'delete-booking' })
  async deleteBookingById(
    @Payload() deleteBookingDto: DeleteBookingDto,
    @Ctx() context: RmqContext,
  ): Promise<successResponse> {
    this.commonService.acknowledgeMessage(context);

    return this.bookingService.deleteBookingById(deleteBookingDto);
  }
}
