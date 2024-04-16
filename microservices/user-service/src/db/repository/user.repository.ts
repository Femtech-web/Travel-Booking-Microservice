import { Injectable } from '@nestjs/common';
import { IPaginationQuery } from '../interfaces';
import { User as userModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BaseRepository } from '../base/base.abstract.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UserRepository extends BaseRepository<'user'> {
  constructor() {
    super(new PrismaService());
    this.model = 'user';
  }

  public omit(obj: any, ...props: any[]) {
    const result = { ...obj };
    props.forEach((prop) => delete result[prop]);
    return result;
  }

  public async getAllUsers(params: IPaginationQuery) {
    const filteredParams = this.omit(params, 'page', 'perPage');

    const users = await this.findMany({
      where: filteredParams,
      skip: params.perPage * params.page - params.perPage,
      take: params.perPage,
    });

    return users;
  }

  public async countDocuments(params: IPaginationQuery) {
    const filteredParams = this.omit(params, 'page', 'perPage');

    const totalCount = await this.count({
      where: filteredParams,
    });

    return totalCount;
  }

  public async createUser(
    data: Omit<userModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<userModel> {
    return await this.create({
      data: {
        ...data,
        credentials: {
          create: {
            version: 0,
            lastPassword: data.password,
          },
        },
      },
      include: {
        credentials: true,
      },
    });
  }

  public async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<userModel> {
    const hashedPassword = await hash(newPassword, 10);
    return await this.update({
      where: { id },
      data: {
        password: hashedPassword,
        credentials: {
          update: {
            version: {
              increment: 1,
            },
            lastPassword: oldPassword,
          },
        },
      },
      include: {
        credentials: true,
      },
    });
  }

  public async updateVersion(id: string) {
    await this.update({
      where: { id },
      data: {
        credentials: {
          update: {
            version: {
              increment: 1,
            },
          },
        },
      },
      include: {
        credentials: true,
      },
    });
  }
}
