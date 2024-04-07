import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { BookingEntity } from './entities/booking.entity';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([BookingEntity]),
    CqrsModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, ...QueryHandlers, ...CommandHandlers],
})
export class BookingModule {}
