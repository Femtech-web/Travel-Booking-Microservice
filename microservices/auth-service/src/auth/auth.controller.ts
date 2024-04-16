import { Controller, UnauthorizedException } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { IAuthResult } from './interfaces';
import { IMessage } from '../utils/interfaces';
import { isUndefined } from '../utils/validation.utils';
import { CommonService } from '../utils/common';
import { TokenService } from '../token/token.service';
import {
  ChangePasswordDto,
  ConfirmEmailDto,
  EmailDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
} from './dtos';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly commonService: CommonService,
    private readonly tokenService: TokenService,
  ) {}

  @MessagePattern({ cmd: 'sign-up' })
  public async signUp(
    @Payload('signUpOptions') signUpDto: SignUpDto,
    @Payload('origin') origin: string | undefined,
    @Ctx() context: RmqContext,
  ): Promise<IMessage> {
    this.commonService.acknowledgeMessage(context);

    return await this.authService.signUp(signUpDto, origin);
  }

  @MessagePattern({ cmd: 'sign-in' })
  public async signIn(
    @Payload('signInOptions') signInDto: SignInDto,
    @Payload('origin') origin: string | undefined,
    @Ctx() context: RmqContext,
  ): Promise<IAuthResult> {
    this.commonService.acknowledgeMessage(context);

    return await this.authService.signIn(signInDto, origin);
  }

  @MessagePattern({ cmd: 'refresh-access' })
  public async refreshAccess(
    @Payload('token') token: string,
    @Payload('origin') origin: string,
    @Ctx() context: RmqContext,
  ): Promise<IAuthResult> {
    this.commonService.acknowledgeMessage(context);

    const confirmedToken = await this.refreshTokenFromReq(token);
    return await this.authService.refreshTokenAccess(confirmedToken, origin);
  }

  @MessagePattern({ cmd: 'logout' })
  public async logout(
    @Payload('token') token: string,
    @Ctx() context: RmqContext,
  ): Promise<IMessage> {
    this.commonService.acknowledgeMessage(context);

    const confirmedToken = await this.refreshTokenFromReq(token);
    return await this.authService.logout(confirmedToken);
  }

  @MessagePattern({ cmd: 'confirm-email' })
  public async confirmEmail(
    @Payload('confirmEmailOptions') confirmEmailDto: ConfirmEmailDto,
    @Payload('origin') origin: string | undefined,
    @Ctx() context: RmqContext,
  ): Promise<IAuthResult> {
    this.commonService.acknowledgeMessage(context);

    return await this.authService.confirmEmail(confirmEmailDto, origin);
  }

  @MessagePattern({ cmd: 'forgot-password' })
  public async forgotPassword(
    @Payload('email') emailDto: EmailDto,
    @Payload('origin') origin: string | undefined,
    @Ctx() context: RmqContext,
  ): Promise<IMessage> {
    this.commonService.acknowledgeMessage(context);

    return this.authService.resetPasswordEmail(emailDto, origin);
  }

  @MessagePattern({ cmd: 'reset-password' })
  public async resetPassword(
    @Payload() resetPasswordDto: ResetPasswordDto,
    @Ctx() context: RmqContext,
  ): Promise<IMessage> {
    this.commonService.acknowledgeMessage(context);

    return this.authService.resetPassword(resetPasswordDto);
  }

  @MessagePattern({ cmd: 'update-password' })
  public async updatePassword(
    @Payload('resetPasswordOptions') changePasswordDto: ChangePasswordDto,
    @Payload('origin') origin: string | undefined,
    @Payload('userId') userId: string,
    @Ctx() context: RmqContext,
  ): Promise<IAuthResult> {
    this.commonService.acknowledgeMessage(context);

    return await this.authService.updatePassword(
      userId,
      changePasswordDto,
      origin,
    );
  }

  @MessagePattern({ cmd: 'verify-token' })
  public async verifyToken(@Payload() data: any, @Ctx() context: RmqContext) {
    const { token, tokenType } = data;
    this.commonService.acknowledgeMessage(context);

    return this.tokenService.verifyToken(token, tokenType);
  }

  private async refreshTokenFromReq(token: string): Promise<string> {
    if (isUndefined(token)) {
      throw new UnauthorizedException();
    }

    return token;
  }
}
