import { PrismaClient } from '@prisma/client';
import { IRepository } from './base.interface.repository';
import { PrismaService } from '../../services/prisma.service';

export abstract class BaseInterfaceRepository<
  T extends Exclude<keyof PrismaClient, symbol | `$${string}`>,
> implements IRepository
{
  public readonly model!: T;

  constructor(private readonly prisma: PrismaService) {}

  public async aggregate(...args: Parameters<PrismaClient[T]['aggregate']>) {
    return (this.prisma[this.model].aggregate as any)(...args);
  }

  public async count(...args: Parameters<PrismaClient[T]['count']>) {
    return (this.prisma[this.model].count as any)(...args);
  }

  public async create(...args: Parameters<PrismaClient[T]['create']>) {
    return (this.prisma[this.model].create as any)(...args);
  }

  public async createMany(...args: Parameters<PrismaClient[T]['createMany']>) {
    return (this.prisma[this.model].createMany as any)(...args);
  }

  public async delete(...args: Parameters<PrismaClient[T]['delete']>) {
    return (this.prisma[this.model].delete as any)(...args);
  }

  public async findFirst(...args: Parameters<PrismaClient[T]['findFirst']>) {
    return (this.prisma[this.model].findFirst as any)(...args);
  }

  public async findFirstOrThrow(
    ...args: Parameters<PrismaClient[T]['findFirstOrThrow']>
  ) {
    return (this.prisma[this.model].findFirstOrThrow as any)(...args);
  }

  public async findMany(...args: Parameters<PrismaClient[T]['findMany']>) {
    return (this.prisma[this.model].findMany as any)(...args);
  }

  public async findUnique(...args: Parameters<PrismaClient[T]['findUnique']>) {
    return (this.prisma[this.model].findUnique as any)(...args);
  }

  public async findUniqueOrThrow(
    ...args: Parameters<PrismaClient[T]['findUniqueOrThrow']>
  ) {
    return (this.prisma[this.model].findUniqueOrThrow as any)(...args);
  }

  public async update(...args: Parameters<PrismaClient[T]['update']>) {
    return (this.prisma[this.model].update as any)(...args);
  }

  public async updateMany(...args: Parameters<PrismaClient[T]['updateMany']>) {
    return (this.prisma[this.model].updateMany as any)(...args);
  }

  public async upsert(...args: Parameters<PrismaClient[T]['upsert']>) {
    return (this.prisma[this.model].upsert as any)(...args);
  }
}
// export abstract class BaseInterfaceRepository<T> implements IRepository<T> {
//   // protected readonly prisma: PrismaClient;
//   public _model: Prisma<T>;

//   constructor(model: Prisma<T>) {
//     this._model = model;
//   }

// public async create(
//   data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
// ): Promise<T> {
//   return await this._model.create({
//     data: {
//       ...data,
//     },
//   });
// }

// public async findOneById(id: string): Promise<T> {
// return await this._model.findUnique({
//   where: { id },
// });
// }

// public async findOneByUsername(username: string): Promise<T | null> {
//   return await this._model.findUnique({
//     where: { username: username.toLowerCase() },
//   });
// }

// public async findOneByEmail(email: string): Promise<T | null> {
//   return await this._model.findUnique({
//     where: { email: email.toLowerCase() },
//   });
// }

// public async findAll(params: IParams): Promise<T[]> {
//   return await this._model.findMany(params);
// }

// public async countAll(params: IParams): Promise<number> {
//   return this._model.count(params);
// }

// public async remove(id: string): Promise<T | null> {
//   return await this._model.delete({
//     where: { id },
//   });
// }

// public async update(
//   id: string,
//   data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>,
// ): Promise<T | null> {
//   return await this._model.update({
// where: { id },
// data,
//   });
// }

// }
