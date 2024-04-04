import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
