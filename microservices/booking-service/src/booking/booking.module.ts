import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { UtilsModule } from '../utils/utils.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [UtilsModule, DbModule, CqrsModule],
  controllers: [BookingController],
  providers: [BookingService, ...QueryHandlers, ...CommandHandlers],
})
export class BookingModule {}
