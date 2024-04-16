import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { ConfigurationModule } from '../configs/config.module';

@Module({
  imports: [ConfigurationModule, TypeOrmModule.forFeature([BookingEntity])],
  exports: [TypeOrmModule],
})
export class DbModule {}
