import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configs/config.module';
import { BookingModule } from './booking/booking.module';
import { UtilsModule } from './utils/utils.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigurationModule, BookingModule, UtilsModule, DbModule],
})
export class AppModule {}
