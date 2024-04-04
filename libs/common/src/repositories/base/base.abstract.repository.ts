import { PrismaClient } from '@prisma/client';
import { IRepository } from './base.interface.repository';

export abstract class BaseInterfaceRepository<T> implements IRepository<T> {
  protected readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async create(
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<T> {
    return await this.prisma[this.modelName()].create({
      data: {
        ...data,
      },
    });
  }

  public async findOneById(id: string): Promise<T | null> {
    return await this.prisma[this.modelName()].findUnique({
      where: { id },
    });
  }

  public async findOneByUsername(username: string): Promise<T | null> {
    return await this.prisma[this.modelName()].findUnique({
      where: { username: username.toLowerCase() },
    });
  }

  public async findOneByEmail(email: string): Promise<T | null> {
    return await this.prisma[this.modelName()].findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  public async findAll(): Promise<T[]> {
    return await this.prisma[this.modelName()].findMany();
  }

  public async remove(id: string): Promise<T | null> {
    return await this.prisma[this.modelName()].delete({
      where: { id },
    });
  }

  public async update(
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<T | null> {
    return await this.prisma[this.modelName()].update({
      where: { id },
      data,
    });
  }

  public abstract modelName(): keyof PrismaClient;
}
