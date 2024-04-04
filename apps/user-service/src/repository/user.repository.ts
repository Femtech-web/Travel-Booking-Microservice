import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserEntity, BaseInterfaceRepository } from '@app/common';
import { hash } from 'bcrypt';

@Injectable()
export class UserRepository extends BaseInterfaceRepository<UserEntity> {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  public modelName(): keyof PrismaClient {
    return 'user';
  }

  public async createUser(
    data: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: {
        ...data,
        credentials: {
          create: {
            version: 0,
            lastPassword: '',
            passwordUpdatedAt: 0,
            updatedAt: 0,
          },
        },
      },
    });
  }

  public async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<UserEntity> {
    const hashedPassword = await hash(newPassword, 10);
    return await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        credentials: {
          update: {
            version: {
              increment: 1,
            },
            lastPassword: oldPassword,
            passwordUpdatedAt: Date.now(),
            updatedAt: Date.now(),
          },
        },
      },
    });
  }

  public async updateVersion(id: string): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        credentials: {
          update: {
            version: {
              increment: 1,
            },
            updatedAt: Date.now(),
          },
        },
      },
    });
  }
}
