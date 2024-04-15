import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configs/config.module';
import { DbModule } from './db/db.module';
import { UtilsModule } from './utils/utils.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, DbModule, UtilsModule, UserModule],
})
export class AppModule {}
