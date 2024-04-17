import {
  Body,
  Controller,
  Res,
  Inject,
  Query,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrentUser, Public } from '../decorators';
import { IResponseUser, IAuthResponseUser } from '../interfaces';
import { Response } from 'express';
import { CommonService } from '../utils/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import {
  GetUserParams,
  UpdateUserDto,
  ChangeEmailDto,
  PasswordDto,
} from '../dtos/user';

@Controller('api/v1/user')
export class UserGateway {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly commonService: CommonService,
  ) {}

  @Get('/me')
  public async GetMe(@CurrentUser() id: string): Promise<IAuthResponseUser> {
    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'get-me' },
      { id },
    );
  }

  @Get('/')
  public async GetAllUsers(
    @Query() params: PaginationQueryDto,
  ): Promise<IAuthResponseUser[]> {
    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'fetch-all-users' },
      { ...params },
    );
  }

  @Get('/:id')
  public async GetUser(@Param() params: GetUserParams): Promise<IResponseUser> {
    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'get-single-user' },
      { ...params },
    );
  }

  @Patch('/')
  public async UpdateUser(
    @CurrentUser() id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<IResponseUser> {
    const updateOptions = dto;

    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'update-user' },
      { id, updateOptions },
    );
  }

  @Patch('/email')
  public async UpdateEmail(
    @CurrentUser() id: string,
    @Body() dto: ChangeEmailDto,
  ): Promise<IAuthResponseUser> {
    const updateOptions = dto;

    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'update-email' },
      { id, updateOptions },
    );
  }

  @Delete('/')
  public async DeleteUser(
    @CurrentUser() id: string,
    @Body() dto: PasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    const deleteOptions = dto;

    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'delete-user' },
      { id, deleteOptions, res },
    );
  }
}
