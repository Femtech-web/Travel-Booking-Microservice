import { PrismaClient } from '@prisma/client';

export interface IRepository<T> {
  modelName(): keyof PrismaClient;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  findOneById(id: string): Promise<T | null>;
  findOneByUsername(username: string): Promise<T | null>;
  findOneByEmail(email: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  remove(id: string): Promise<T | null>;
  update(
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<T | null>;
}
