import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BaseInterfaceRepository } from './base/base.abstract.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseInterfaceRepository<UserEntity> {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  public modelName(): keyof PrismaClient {
    return 'user';
  }
}

// // import { PrismaClient } from '@prisma/client';
// import { UserEntity } from '../../entities/user.entity';

// export class UserRepository {
//   constructor(private readonly prisma: PrismaClient) {}

//   public async create(
//     data: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>,
//   ): Promise<UserEntity> {
//     return await this.prisma.user.create({
//       data: {
//         ...data,
//         credentials: {
//           create: {
//             version: 0,
//             lastPassword: '',
//             passwordUpdatedAt: 0,
//             updatedAt: 0,
//           },
//         },
//       },
//     });
//   }

//   public async findOneById(id: number): Promise<UserEntity | null> {
//     return await this.prisma.user.findUnique({
//       where: { id },
//     });
//   }

//   public async findOneByUsername(
//     username: string,
//   ): Promise<UserEntity | null> {
//     return await this.prisma.user.findUnique({
//       where: { username: username.toLowerCase() },
//     });
//   }

//   public async findOneByEmail(email: string): Promise<UserEntity | null> {
//     return await this.prisma.user.findUnique({
//       where: { email: email.toLowerCase() },
//     });
//   }

//   public async findAll(): Promise<UserEntity[]> {
//     return await this.prisma.user.findMany();
//   }

//   public async remove(id: number): Promise<UserEntity | null> {
//     return await this.prisma.user.delete({
//       where: { id },
//     });
//   }

//   public async update(
//     id: number,
//     data: Partial<Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>>,
//   ): Promise<UserEntity | null> {
//     return await this.prisma.user.update({
//       where: { id },
//       data,
//     });
//   }

//   public async findOrCreate(
//     email: string,
//     name: string,
//   ): Promise<UserEntity> {
//     const existingUser = await this.findOneByEmail(email);
//     if (existingUser) return existingUser;

//     return await this.create({
//       email: email.toLowerCase(),
//       name,
//       // You may include other default values here
//     });
//   }

// public async updatePassword(
//   id: number,
//   newPassword: string,
// ): Promise<UserEntity> {
//   const hashedPassword = await hash(newPassword, 10);
//   return await this.prisma.user.update({
//     where: { id },
//     data: {
//       password: hashedPassword,
//       credentials: {
//         update: {
//           version: {
//             increment: 1,
//           },
//           lastPassword: newPassword,
//           passwordUpdatedAt: Date.now(),
//           updatedAt: Date.now(),
//         },
//       },
//     },
//   });
// }

//   // Add other methods as needed
// }

// public updatePassword(password: string): void {
//   this.version++;
//   this.lastPassword = password;
//   const now = dayjs().unix();
//   this.passwordUpdatedAt = now;
//   this.updatedAt = now;
// }

// public updateVersion(): void {
//   this.version++;
//   this.updatedAt = dayjs().unix();
// }
