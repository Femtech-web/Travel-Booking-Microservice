import {
  Body,
  Controller,
  Res,
  Inject,
  Post,
  Req,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { AuthResponseMapper } from '../mappers';
import { IMessage, ICustomRequest } from '../interfaces';
import { CommonService } from '../utils/common';
import { Origin, Public, CurrentUser } from '../decorators';
import {
  SignUpDto,
  SignInDto,
  ConfirmEmailDto,
  ResetPasswordDto,
  ChangePasswordDto,
  EmailDto,
} from '../dtos/auth';

@Controller('api/v1/auth')
export class AuthGateway {
  private readonly cookiePath = '/api/auth';
  private readonly cookieName: string = '';
  private readonly testing: boolean;
  private readonly refreshTime: number;

  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {
    this.cookieName = this.configService.get<string>('refresh_cookie');
    this.refreshTime = this.configService.get<number>('refresh_time');
    this.testing = this.configService.get<boolean>('testing');
  }

  @Public()
  @Post('/sign-up')
  public async SignUp(
    @Body() signUpDto: SignUpDto,
    @Origin() origin: string,
  ): Promise<IMessage> {
    const signUpOptions = signUpDto;

    return await this.commonService.sendEvent(
      this.authService,
      { cmd: 'sign-up' },
      { signUpOptions, origin },
    );
  }

  @Public()
  @Post('/sign-in')
  public async SignIn(
    @Res() res: Response,
    @Body() signInDto: SignInDto,
    @Origin() origin: string | undefined,
  ): Promise<void> {
    const signInOptions = signInDto;
    console.log(signInOptions);
    console.log(origin);

    const result = await this.commonService.sendEvent(
      this.authService,
      { cmd: 'sign-in' },
      { signInOptions, origin },
    );

    this.saveRefreshCookie(res, result.refreshToken);
    res.status(HttpStatus.OK).json(AuthResponseMapper.map(result));
  }

  @Public()
  @Post('/refresh-access')
  public async RefreshAccess(
    @Req() req: ICustomRequest,
    @Res() res: Response,
    @Origin() origin: string,
  ): Promise<void> {
    const token = await this.getCookieFromRequest(req);

    const result = await this.commonService.sendEvent(
      this.authService,
      { cmd: 'refresh-access' },
      { token, origin },
    );

    this.saveRefreshCookie(res, result.refreshToken);
    res.status(HttpStatus.OK).send(AuthResponseMapper.map(result));
  }

  @Post('/logout')
  public async Logout(
    @Req() req: ICustomRequest,
    @Res() res: Response,
  ): Promise<void> {
    const token = await this.getCookieFromRequest(req);

    const message = await this.commonService.sendEvent(
      this.authService,
      { cmd: 'logout' },
      { token, res },
    );

    res
      .clearCookie(this.cookieName, { path: this.cookiePath })
      .header('Content-Type', 'application/json')
      .status(HttpStatus.OK)
      .send(message);
  }

  @Public()
  @Post('/confirm-email')
  public async ConfirmEmail(
    @Res() res: Response,
    @Body() confirmEmailDto: ConfirmEmailDto,
    @Origin() origin: string,
  ): Promise<void> {
    const confirmEmailOptions = confirmEmailDto;

    const result = await this.commonService.sendEvent(
      this.authService,
      { cmd: 'confirm-email' },
      { confirmEmailOptions, origin },
    );

    this.saveRefreshCookie(res, result.refreshToken);
    res.status(HttpStatus.OK).send(AuthResponseMapper.map(result));
  }

  @Public()
  @Post('/forgot-password')
  public async ForgotPassword(
    @Body() emailDto: EmailDto,
    @Origin() origin: string,
  ): Promise<void> {
    const email = emailDto;

    return await this.commonService.sendEvent(
      this.authService,
      { cmd: 'forgot-password' },
      { email, origin },
    );
  }

  @Public()
  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  public async ResetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    return await this.commonService.sendEvent(
      this.authService,
      { cmd: 'reset-password' },
      { resetPasswordDto },
    );
  }

  @Patch('/update-password')
  public async UpdatePassword(
    @CurrentUser() userId: number,
    @Origin() origin: string | undefined,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    const resetPasswordOptions = changePasswordDto;

    const result = await this.commonService.sendEvent(
      this.authService,
      { cmd: 'update-password' },
      { resetPasswordOptions, origin, userId },
    );

    this.saveRefreshCookie(res, result.refreshToken);
    res.status(HttpStatus.OK).send(AuthResponseMapper.map(result));
  }

  private async getCookieFromRequest(req: ICustomRequest): Promise<string> {
    const tokenKey: string | undefined = req.cookies[this.cookieName];
    const token: string | undefined = req.signedCookies[tokenKey];

    return token;
  }

  private saveRefreshCookie(res: Response, refreshToken: string): void {
    res
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
