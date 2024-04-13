import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { BookingEntity } from './entities/booking.entity';
import {
  GetBookingDto,
  CreateBookingDto,
  UpdateBookingDto,
  DeleteBookingDto,
  CommonService,
  successResponse,
} from '@app/common';

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
