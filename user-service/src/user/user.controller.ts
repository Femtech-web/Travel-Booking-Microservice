import { Controller, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { ResponseUserMapper, AuthResponseUserMapper } from './mappers';
import { IResponseUser, IUser, IAuthResponseUser } from './interfaces';
import {
  GetUserParams,
  ChangeEmailDto,
  PasswordDto,
  UpdateUserDto,
  PaginationQueryDto,
} from './dtos';
import { UserService } from './user.service';
import { CommonService } from '../utils/common';

@Controller('users')
export class UserController {
  private cookiePath = '/api/auth';
  private cookieName: string;

  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {
    this.cookieName = this.configService.get<string>('refresh_cookie');
  }

  @MessagePattern({ cmd: 'create-user' })
  public async Create(@Payload() data: any, @Ctx() context: RmqContext) {
    const { email, name, password1 } = data;
    this.commonService.acknowledgeMessage(context);

    return this.usersService.create(email, name, password1);
  }

  @MessagePattern({ cmd: 'find-by-email' })
  public async findByEmail(@Payload() data: any, @Ctx() context: RmqContext) {
    const { email } = data;
    this.commonService.acknowledgeMessage(context);

    return this.usersService.findOneByEmail(email);
  }

  @MessagePattern({ cmd: 'find-by-credentials' })
  public async findByCredentials(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const { id, version } = data;
    this.commonService.acknowledgeMessage(context);

    return this.usersService.findOneByCredentials(id, version);
  }

  @MessagePattern({ cmd: 'confirm-email' })
  public async confirmEmail(@Payload() data: any, @Ctx() context: RmqContext) {
    const { userId, version } = data;
    this.commonService.acknowledgeMessage(context);

    return this.usersService.confirmEmail(userId, version);
  }

  @MessagePattern({ cmd: 'reset-password' })
  public async resetPassword(@Payload() data: any, @Ctx() context: RmqContext) {
    const { userId, version, password } = data;
    this.commonService.acknowledgeMessage(context);

    return this.usersService.resetPassword(userId, version, password);
  }

  @MessagePattern({ cmd: 'update-password' })
  public async updatePassword(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const { userId, version, password } = data;
    this.commonService.acknowledgeMessage(context);

    return this.usersService.updatePassword(userId, version, password);
  }

  @MessagePattern({ cmd: 'get-me' })
  public async getMe(
    @Payload('id') id: string,
    @Ctx() context: RmqContext,
  ): Promise<IAuthResponseUser> {
    this.commonService.acknowledgeMessage(context);

    const user = await this.usersService.findOneById(id);
    return AuthResponseUserMapper.map(user);
  }

  @MessagePattern({ cmd: 'fetch-all-users' })
  public async fetchUsers(
    @Payload() params: PaginationQueryDto,
    @Ctx() context: RmqContext,
  ): Promise<IAuthResponseUser[]> {
    this.commonService.acknowledgeMessage(context);

    const users = await this.usersService.fetchAllUsers(params);
    return await this.formatReturnedUsers(users);
  }

  @MessagePattern({ cmd: 'get-single-user' })
  public async getUser(
    @Payload() params: GetUserParams,
    @Ctx() context: RmqContext,
  ): Promise<IResponseUser> {
    this.commonService.acknowledgeMessage(context);

    const user = await this.usersService.findOneById(params.id);
    return ResponseUserMapper.map(user);
  }

  @MessagePattern({ cmd: 'update-user' })
  public async updateUser(
    @Payload('updateOptions') dto: UpdateUserDto,
    @Payload('id') id: string,
    @Ctx() context: RmqContext,
  ): Promise<IResponseUser> {
    this.commonService.acknowledgeMessage(context);

    const user = await this.usersService.update(id, dto);
    return ResponseUserMapper.map(user);
  }

  @MessagePattern({ cmd: 'update-email' })
  public async updateEmail(
    @Payload('updateOptions') dto: ChangeEmailDto,
    @Payload('id') id: string,
    @Ctx() context: RmqContext,
  ): Promise<IAuthResponseUser> {
    this.commonService.acknowledgeMessage(context);

    const user = await this.usersService.updateEmail(id, dto);
    return AuthResponseUserMapper.map(user);
  }

  @MessagePattern({ cmd: 'delete-user' })
  public async deleteUser(
    @Payload('deleteOptions') dto: PasswordDto,
    @Payload('id') id: string,
    @Payload('res') res: Response,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.commonService.acknowledgeMessage(context);

    await this.usersService.delete(id, dto);
    res
      .clearCookie(this.cookieName, { path: this.cookiePath })
      .status(HttpStatus.NO_CONTENT)
      .send();
  }

  private async formatReturnedUsers(
    users: IUser[],
  ): Promise<IAuthResponseUser[]> {
    const formattedUsers = users.map((user) => {
      return AuthResponseUserMapper.map(user);
    });

    return formattedUsers;
  }
}
