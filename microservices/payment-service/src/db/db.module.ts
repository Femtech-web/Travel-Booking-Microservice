import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { ConfigurationModule } from '../configs/config.module';

@Module({
  imports: [ConfigurationModule, TypeOrmModule.forFeature([PaymentEntity])],
  exports: [TypeOrmModule],
})
export class DbModule {}
