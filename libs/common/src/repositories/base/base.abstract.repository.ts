import { PrismaClient } from '@prisma/client';
import { IRepository } from './base.interface.repository';
import { PrismaService } from '../../services/prisma.service';

export abstract class BaseInterfaceRepository<
  T extends Exclude<keyof PrismaClient, symbol | `$${string}`>,
> implements IRepository
{
  public model!: T;

  constructor(private readonly prisma: PrismaService) {}

  public async aggregate(...args: Parameters<PrismaClient[T]['aggregate']>) {
    const params = args[0];
    return (this.prisma[this.model].aggregate as any)(params);
  }

  public async count(...args: Parameters<PrismaClient[T]['count']>) {
    const params = args[0];
    return (this.prisma[this.model].count as any)(params);
  }

  public async create(...args: Parameters<PrismaClient[T]['create']>) {
    const params = args[0];
    return (this.prisma[this.model].create as any)(params);
  }

  public async createMany(...args: Parameters<PrismaClient[T]['createMany']>) {
    const params = args[0];
    return (this.prisma[this.model].createMany as any)(params);
  }

  public async delete(...args: Parameters<PrismaClient[T]['delete']>) {
    const params = args[0];
    return (this.prisma[this.model].delete as any)(params);
  }

  public async findFirst(...args: Parameters<PrismaClient[T]['findFirst']>) {
    const params = args[0];
    return (this.prisma[this.model].findFirst as any)(params);
  }

  public async findFirstOrThrow(
    ...args: Parameters<PrismaClient[T]['findFirstOrThrow']>
  ) {
    const params = args[0];
    return (this.prisma[this.model].findFirstOrThrow as any)(params);
  }

  public async findMany(...args: Parameters<PrismaClient[T]['findMany']>) {
    const params = args[0];
    return (this.prisma[this.model].findMany as any)(params);
  }

  public async findUnique(...args: Parameters<PrismaClient[T]['findUnique']>) {
    const params = args[0];
    return (this.prisma[this.model].findUnique as any)(params);
  }

  public async findUniqueOrThrow(
    ...args: Parameters<PrismaClient[T]['findUniqueOrThrow']>
  ) {
    const params = args[0];
    return (this.prisma[this.model].findUniqueOrThrow as any)(params);
  }

  public async update(...args: Parameters<PrismaClient[T]['update']>) {
    const params = args[0];
    return (this.prisma[this.model].update as any)(params);
  }

  public async updateMany(...args: Parameters<PrismaClient[T]['updateMany']>) {
    const params = args[0];
    return (this.prisma[this.model].updateMany as any)(params);
  }

  public async upsert(...args: Parameters<PrismaClient[T]['upsert']>) {
    const params = args[0];
    return (this.prisma[this.model].upsert as any)(params);
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
