import { Controller, HttpStatus, UnauthorizedException } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Request } from 'express-serve-static-core';
import { AuthService } from './auth.service';
import {
  IMessage,
  isUndefined,
  ChangePasswordDto,
  ConfirmEmailDto,
  EmailDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  CommonService,
  AuthResponseMapper,
  ICustomRequest,
} from '@app/common';

@Controller()
export class AuthController {
  private readonly cookiePath = '/api/auth';
  private readonly cookieName: string;
  private readonly refreshTime: number;
  private readonly testing: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {
    this.cookieName = this.configService.get<string>('refresh_cookie');
    this.refreshTime = this.configService.get<number>('jwt.refresh.time');
    this.testing = this.configService.get<boolean>('testing');
  }

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
    @Payload('res') res: Response,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.commonService.acknowledgeMessage(context);

    const result = await this.authService.signIn(signInDto, origin);
    this.saveRefreshCookie(res, result.refreshToken)
      .status(HttpStatus.OK)
      .send(AuthResponseMapper.map(result));
  }

  @MessagePattern({ cmd: 'refresh-access' })
  public async refreshAccess(
    @Payload('req') req: ICustomRequest,
    @Payload('res') res: Response,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.commonService.acknowledgeMessage(context);

    const token = this.refreshTokenFromReq(req);
    const result = await this.authService.refreshTokenAccess(
      token,
      req.headers.origin,
    );
    this.saveRefreshCookie(res, result.refreshToken)
      .status(HttpStatus.OK)
      .send(AuthResponseMapper.map(result));
  }

  @MessagePattern({ cmd: 'logout' })
  public async logout(
    @Payload('req') req: ICustomRequest,
    @Payload('res') res: Response,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.commonService.acknowledgeMessage(context);

    const token = this.refreshTokenFromReq(req);
    const message = await this.authService.logout(token);
    res
      .clearCookie(this.cookieName, { path: this.cookiePath })
      .header('Content-Type', 'application/json')
      .status(HttpStatus.OK)
      .send(message);
  }

  @MessagePattern({ cmd: 'confirm-email' })
  public async confirmEmail(
    @Payload('confirmEmailOptions') confirmEmailDto: ConfirmEmailDto,
    @Payload('origin') origin: string | undefined,
    @Payload('res') res: Response,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.commonService.acknowledgeMessage(context);

    const result = await this.authService.confirmEmail(confirmEmailDto, origin);
    this.saveRefreshCookie(res, result.refreshToken)
      .status(HttpStatus.OK)
      .send(AuthResponseMapper.map(result));
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
    @Payload('res') res: Response,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.commonService.acknowledgeMessage(context);

    const result = await this.authService.updatePassword(
      userId,
      changePasswordDto,
      origin,
    );
    this.saveRefreshCookie(res, result.refreshToken)
      .status(HttpStatus.OK)
      .send(AuthResponseMapper.map(result));
  }

  private refreshTokenFromReq(req: Request): string {
    const tokenKey: string | undefined = req.cookies[this.cookieName];

    const token: string | undefined = req.signedCookies[tokenKey];

    if (isUndefined(token)) {
      throw new UnauthorizedException();
    }

    return token;
  }

  private saveRefreshCookie(res: Response, refreshToken: string): Response {
    return res
      .cookie(this.cookieName, refreshToken, {
        secure: !this.testing,
        httpOnly: true,
        signed: true,
        path: this.cookiePath,
        expires: new Date(Date.now() + this.refreshTime * 1000),
      })
      .header('Content-Type', 'application/json');
  }
}
