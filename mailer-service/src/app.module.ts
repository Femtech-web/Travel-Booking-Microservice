import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configs/config.module';
import { MailerModule } from './mailer/mailer.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ConfigurationModule, MailerModule, UtilsModule],
})
export class AppModule {}
