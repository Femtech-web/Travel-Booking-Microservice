import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { MailerService } from './mailer.service';
import { CommonService } from '../utils/common';

@Controller()
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'send-confirmation-email' })
  public async sendConfirmationEmail(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const { user, confirmationToken } = data;
    this.commonService.acknowledgeMessage(context);

    return await this.mailerService.sendConfirmationEmail(
      user,
      confirmationToken,
    );
  }

  @MessagePattern({ cmd: 'send-passwordReset-email' })
  public async sendResetPasswordEmail(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const { user, resetToken } = data;
    this.commonService.acknowledgeMessage(context);

    return await this.mailerService.sendResetPasswordEmail(user, resetToken);
  }
}
