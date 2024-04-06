/* eslint-disable prefer-const */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import {
  isNull,
  isUndefined,
  CommonService,
  ChangeEmailDto,
  PasswordDto,
  UpdateUserDto,
} from '@app/common';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly commonService: CommonService,
  ) {}

  public async create(
    email: string,
    name: string,
    password1?: string,
  ): Promise<UserEntity> {
    const formattedEmail = email.toLowerCase();
    await this.checkEmailUniqueness(formattedEmail);
    const formattedName = this.commonService.formatName(name);
    const user = await this.usersRepository.createUser({
      email: formattedEmail,
      name: formattedName,
      password: await hash(password1, 10),
      isConfirmed: false,
    });
    console.log(`returned created user ==== ${user}`);
    await this.commonService.saveEntity(user);
    return user;
  }

  public async findOneById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findUnique({
      where: { id },
    });
    this.commonService.checkEntityExistence(user, 'User');
    return user;
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    const formattedEmail = email.toLowerCase();
    const user = await this.usersRepository.findUnique({
      where: { email: formattedEmail },
    });
    this.throwUnauthorizedException(user);
    return user;
  }

  public async fetchAllUsers(queryParams): Promise<UserEntity[]> {
    let params = {
      page: 1,
      perPage: 10,
      ...queryParams,
    };

    // Dynamically created query params based on endpoint params
    for (const key in queryParams) {
      if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
        params[key] = queryParams[key];
      }
    }
    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;

    return await this.usersRepository.getAllUsers(params);
  }

  public async uncheckedUserByEmail(email: string): Promise<UserEntity> {
    const formattedEmail = email.toLowerCase();
    return await this.usersRepository.findUnique({
      where: { email: formattedEmail },
    });
  }

  public async findOneByCredentials(
    id: string,
    version: number,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findUnique({
      where: { id },
    });
    this.throwUnauthorizedException(user);

    if (user.credentials.version !== version) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  public async confirmEmail(
    userId: string,
    version: number,
  ): Promise<UserEntity> {
    const user = await this.findOneByCredentials(userId, version);

    if (user.isConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    await this.usersRepository.updateVersion(userId);
    const data = { isConfirmed: true };
    const updatedUser = await this.usersRepository.update({
      where: { id: userId },
      data,
    });

    await this.commonService.saveEntity(updatedUser);
    return updatedUser;
  }

  public async update(userId: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOneById(userId);
    const { name } = dto;

    if (!isUndefined(name) && !isNull(name)) {
      if (name === user.name) {
        throw new BadRequestException('Name must be different');
      }

      user.name = this.commonService.formatName(name);
    }

    await this.commonService.saveEntity(user);
    return user;
  }

  public async updatePassword(
    userId: string,
    newPassword: string,
    password?: string,
  ): Promise<UserEntity> {
    const user = await this.findOneById(userId);

    if (isUndefined(password) || isNull(password)) {
      throw new BadRequestException('Password is required');
    }
    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Wrong password');
    }
    if (await compare(newPassword, user.password)) {
      throw new BadRequestException('New password must be different');
    }

    return await this.changePassword(user, newPassword);
  }

  public async resetPassword(
    userId: string,
    version: number,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.findOneByCredentials(userId, version);
    return await this.changePassword(user, password);
  }

  public async updateEmail(
    userId: string,
    dto: ChangeEmailDto,
  ): Promise<UserEntity> {
    const user = await this.findOneById(userId);
    const { email, password } = dto;

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Wrong password');
    }

    const formattedEmail = email.toLowerCase();

    if (user.email === formattedEmail) {
      throw new BadRequestException('Email should be different');
    }

    await this.checkEmailUniqueness(formattedEmail);
    const data = {
      email: formattedEmail,
    };
    const updatedUser = await this.usersRepository.update({
      where: { id: userId },
      data,
    });
    await this.commonService.saveEntity(updatedUser);
    return updatedUser;
  }

  public async delete(userId: string, dto: PasswordDto): Promise<UserEntity> {
    const user = await this.findOneById(userId);

    if (!(await compare(dto.password, user.password))) {
      throw new BadRequestException('Wrong password');
    }

    const deletedUser = await this.usersRepository.delete({
      where: { id: userId },
    });
    return deletedUser;
  }

  private async changePassword(
    user: UserEntity,
    password: string,
  ): Promise<UserEntity> {
    const userId = user.id;
    const oldPassword = user.password;
    const updatedUser = await this.usersRepository.updatePassword(
      userId,
      oldPassword,
      password,
    );

    await this.commonService.saveEntity(updatedUser);
    return updatedUser;
  }

  private throwUnauthorizedException(
    user: undefined | null | UserEntity,
  ): void {
    if (isUndefined(user) || isNull(user)) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async checkEmailUniqueness(email: string): Promise<void> {
    const existingEmail = await this.uncheckedUserByEmail(email);

    if (existingEmail) {
      throw new ConflictException('Email already in use');
    }
  }
}
