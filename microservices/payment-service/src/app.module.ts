import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configs/config.module';
import { UtilsModule } from './utils/utils.module';
import { DbModule } from './db/db.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ConfigurationModule, UtilsModule, DbModule, PaymentModule],
})
export class AppModule {}
