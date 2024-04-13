import {
  Body,
  Controller,
  Inject,
  Get,
  Param,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import {
  CommonService,
  GetBookingDto,
  CreateBookingDto,
  DeleteBookingDto,
  successResponse,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { BookingModel } from '../models';

@Controller('api/bookings')
export class BookingGateway {
  constructor(
    @Inject('BOOKING_SERVICE') private readonly bookingService: ClientProxy,
    private readonly commonService: CommonService,
  ) {}

  @Get('/:id')
  public async GetBookingById(
    @Param() getBookingDto: GetBookingDto,
  ): Promise<BookingModel> {
    return await this.commonService.sendEvent(
      this.bookingService,
      { cmd: 'get-booking' },
      { ...getBookingDto },
    );
  }

  @Post('/')
  public async CreateBooking(
    @Body() newBooking: CreateBookingDto,
  ): Promise<BookingModel> {
    return await this.commonService.sendEvent(
      this.bookingService,
      { cmd: 'create-booking' },
      { ...newBooking },
    );
  }

  @Put('/:id')
  async UpdateBooking(
    @Param('id') id: string,
    @Body() updatedBooking: CreateBookingDto,
  ): Promise<BookingModel> {
    return await this.commonService.sendEvent(
      this.bookingService,
      { cmd: 'update-booking' },
      { updatedBooking, id },
    );
  }

  @Delete('/:id')
  async DeleteBookingById(
    @Param() id: DeleteBookingDto,
  ): Promise<successResponse> {
    return await this.commonService.sendEvent(
      this.bookingService,
      { cmd: 'delete-booking' },
      { id },
    );
  }
}
