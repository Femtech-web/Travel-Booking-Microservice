import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { compare } from 'bcrypt';
import { Cache } from 'cache-manager';
import { isEmail } from 'class-validator';
import { ClientProxy } from '@nestjs/microservices';
import { IAuthResult } from './interfaces';
import { IMessage } from '../utils/interfaces';
import { isUndefined, isNull } from '../utils/validation.utils';
import { CommonService } from '../utils/common';
import { TokenTypeEnum } from '../token/enums/token-type.enums';
import { TokenService } from '../token/token.service';
import {
  ICredentials,
  IEmailToken,
  IRefreshToken,
  IUser,
} from '../token/interfaces';
import {
  ChangePasswordDto,
  ConfirmEmailDto,
  EmailDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
} from './dtos';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly tokenService: TokenService,
    @Inject('MAILER_SERVICE') private readonly mailerService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly commonService: CommonService,
  ) { }

  public async signUp(dto: SignUpDto, domain?: string): Promise<IMessage> {
    const { name, email, password1, password2 } = dto;
    this.comparePasswords(password1, password2);
    const user = await this.commonService.sendEvent(
      this.userService,
      { cmd: 'create-user' },
      { email, name, password1 },
    );

    const tokenType = TokenTypeEnum.CONFIRMATION;
    const confirmationToken = await this.tokenService.generateToken(
      user,
      tokenType,
      domain,
    );

    this.commonService.sendEvent(
      this.mailerService,
      { cmd: 'send-confirmation-email' },
      { user, confirmationToken },
    );

    return this.commonService.generateMessage('Registration successful');
  }

  public async confirmEmail(
    dto: ConfirmEmailDto,
    domain?: string,
  ): Promise<IAuthResult> {
    const { confirmationToken } = dto;

    const tokenType = TokenTypeEnum.CONFIRMATION;
    const verifiedToken = await this.tokenService.verifyToken(
      confirmationToken,
      tokenType,
    );
    const { id, version } = verifiedToken as IEmailToken;

    const user = await this.commonService.sendEvent(
      this.userService,
      { cmd: 'confirm-email' },
      { userId: id, version },
    );

    const [accessToken, refreshToken] =
      await this.tokenService.generateAuthTokens(user, domain);

    return { user, accessToken, refreshToken };
  }

  public async signIn(dto: SignInDto, domain?: string): Promise<IAuthResult> {
    const { email, password } = dto;
    const user = await this.userByEmail(email);

    if (!(await compare(password, user.password))) {
      await this.checkLastPassword(user.credentials, password);
    }
    if (!user.isConfirmed) {
      const tokenType = TokenTypeEnum.CONFIRMATION;
      const confirmationToken = await this.tokenService.generateToken(
        user,
        tokenType,
        domain,
      );

      this.commonService.sendEvent(
        this.mailerService,
        { cmd: 'send-confirmation-email' },
        { user, confirmationToken },
      );

      throw new UnauthorizedException(
        'Please confirm your email, a new email has been sent',
      );
    }

    const [accessToken, refreshToken] =
      await this.tokenService.generateAuthTokens(user, domain);

    return { user, accessToken, refreshToken };
  }

  public async refreshTokenAccess(
    refreshToken: string,
    domain?: string,
  ): Promise<IAuthResult> {
    const tokenType = TokenTypeEnum.REFRESH;
    const verifiedToken = await this.tokenService.verifyToken(
      refreshToken,
      tokenType,
    );
    const { id, version, tokenId } = verifiedToken as IRefreshToken;

    await this.checkIfTokenIsBlacklisted(id, tokenId);
    const user = await this.commonService.sendEvent(
      this.userService,
      { cmd: 'find-by-credentials' },
      { id, version },
    );

    const [accessToken, newRefreshToken] =
      await this.tokenService.generateAuthTokens(user, domain);

    return { user, accessToken, refreshToken: newRefreshToken };
  }

  public async logout(refreshToken: string): Promise<IMessage> {
    const tokenType = TokenTypeEnum.REFRESH;
    const verifiedToken = await this.tokenService.verifyToken(
      refreshToken,
      tokenType,
    );
    const { id, tokenId, exp } = verifiedToken as IRefreshToken;

    await this.blacklistToken(id, tokenId, exp);
    return this.commonService.generateMessage('Logout successful');
  }

  public async resetPasswordEmail(
    dto: EmailDto,
    domain?: string,
  ): Promise<IMessage> {
    const user = await this.userByEmail(dto.email);

    if (!isUndefined(user) && !isNull(user)) {
      const tokenType = TokenTypeEnum.RESET_PASSWORD;
      const resetToken = await this.tokenService.generateToken(
        user,
        tokenType,
        domain,
      );

      this.commonService.sendEvent(
        this.mailerService,
        { cmd: 'send-passwordReset-email' },
        { user, resetToken },
      );
    }

    return this.commonService.generateMessage('Reset password email sent');
  }

  public async resetPassword(dto: ResetPasswordDto): Promise<IMessage> {
    const { password1, password2, resetToken } = dto;
    const tokenType = TokenTypeEnum.RESET_PASSWORD;
    const verifiedToken = await this.tokenService.verifyToken(
      resetToken,
      tokenType,
    );
    const { id, version } = verifiedToken as IEmailToken;

    this.comparePasswords(password1, password2);
    await this.commonService.sendEvent(
      this.userService,
      { cmd: 'reset-password' },
      { id, version, password1 },
    );
    return this.commonService.generateMessage('Password reset successfull');
  }

  public async updatePassword(
    userId: string,
    dto: ChangePasswordDto,
    domain?: string,
  ): Promise<IAuthResult> {
    const { password1, password2, password } = dto;
    this.comparePasswords(password1, password2);
    const user = await this.commonService.sendEvent(
      this.userService,
      { cmd: 'update-password' },
      {
        userId,
        password1,
        password,
      },
    );
    const [accessToken, refreshToken] =
      await this.tokenService.generateAuthTokens(user, domain);

    return { user, accessToken, refreshToken };
  }

  private async checkLastPassword(
    credentials: ICredentials,
    password: string,
  ): Promise<void> {
    const { lastPassword, passwordUpdatedAt } = credentials;

    if (lastPassword.length === 0 || !(await compare(password, lastPassword))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const now = dayjs();
    const time = dayjs.unix(passwordUpdatedAt);
    const months = now.diff(time, 'month');
    const message = 'You changed your password ';

    if (months > 0) {
      throw new UnauthorizedException(
        message + months + (months > 1 ? ' months ago' : ' month ago'),
      );
    }

    const days = now.diff(time, 'day');

    if (days > 0) {
      throw new UnauthorizedException(
        message + days + (days > 1 ? ' days ago' : ' day ago'),
      );
    }

    const hours = now.diff(time, 'hour');

    if (hours > 0) {
      throw new UnauthorizedException(
        message + hours + (hours > 1 ? ' hours ago' : ' hour ago'),
      );
    }

    throw new UnauthorizedException(message + 'recently');
  }

  private async checkIfTokenIsBlacklisted(
    userId: string,
    tokenId: string,
  ): Promise<void> {
    const time = await this.cacheManager.get<number>(
      `blacklist:${userId}:${tokenId}`,
    );

    if (!isUndefined(time) && !isNull(time)) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async blacklistToken(
    userId: string,
    tokenId: string,
    exp: number,
  ): Promise<void> {
    const now = dayjs().unix();
    const ttl = (exp - now) * 1000;

    if (ttl > 0) {
      await this.commonService.throwInternalError(
        this.cacheManager.set(`blacklist:${userId}:${tokenId}`, now, ttl),
      );
    }
  }

  private comparePasswords(password1: string, password2: string): void {
    if (password1 !== password2) {
      throw new BadRequestException('Passwords do not match');
    }
  }

  private async userByEmail(email: string): Promise<IUser> {
    if (email.includes('@')) {
      if (!isEmail(email)) {
        throw new BadRequestException('Invalid email');
      }

      return await this.commonService.sendEvent(
        this.userService,
        { cmd: 'find-by-email' },
        { email },
      );
    }
  }
}
