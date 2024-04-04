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
import {
  Origin,
  Public,
  CurrentUser,
  SignUpDto,
  SignInDto,
  IMessage,
  CommonService,
  ICustomRequest,
  ConfirmEmailDto,
  ResetPasswordDto,
  ChangePasswordDto,
  EmailDto,
} from '@app/common';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api/auth')
export class AuthGateway {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly commonService: CommonService,
  ) {}

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
    @Res() response: Response,
    @Body() signInDto: SignInDto,
    @Origin() origin: string,
  ): Promise<void> {
    const signInOptions = signInDto;

    return await this.commonService.sendEvent(
      this.authService,
      { cmd: 'sign-in' },
      { signInOptions, origin, response },
    );
  }

  @Public()
  @Post('/refresh-access')
  public async RefreshAccess(
    @Req() req: ICustomRequest,
    @Res() res: Response,
  ): Promise<void> {
    return await this.commonService.sendEvent(
      this.authService,
      { cmd: 'refresh-access' },
      { req, res },
    );
  }

  @Post('/logout')
  public async Logout(
    @Req() req: ICustomRequest,
    @Res() res: Response,
  ): Promise<void> {
    return await this.commonService.sendEvent(
      this.authService,
      { cmd: 'logout' },
      { req, res },
    );
  }

  @Public()
  @Post('/confirm-email')
  public async ConfirmEmail(
    @Res() response: Response,
    @Body() confirmEmailDto: ConfirmEmailDto,
    @Origin() origin: string,
  ): Promise<void> {
    const confirmEmailOptions = confirmEmailDto;

    return await this.commonService.sendEvent(
      this.authService,
      { cmd: 'confirm-email' },
      { confirmEmailOptions, origin, response },
    );
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

    return await this.commonService.sendEvent(
      this.authService,
      { cmd: 'update-password' },
      { resetPasswordOptions, origin, res, userId },
    );
  }
}
