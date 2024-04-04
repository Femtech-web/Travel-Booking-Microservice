import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { MailerService } from './mailer.service';
import { CommonService } from '@app/common';

@Controller()
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern('send-confirmation-email')
  public async sendConfirmationEmail(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('data', data);
    const { user, token } = data;
    this.commonService.acknowledgeMessage(context);

    this.mailerService.sendConfirmationEmail(user, token);
  }

  @MessagePattern('send-passwordReset-email')
  public async sendResetPasswordEmail(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('data', data);
    const { user, token } = data;
    this.commonService.acknowledgeMessage(context);

    this.mailerService.sendResetPasswordEmail(user, token);
  }
}
