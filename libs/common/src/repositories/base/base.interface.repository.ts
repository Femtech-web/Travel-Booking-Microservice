import { PrismaClient } from '@prisma/client';
import { IParams } from './query-find-all.interface';

export interface IRepository<T> {
  modelName(): keyof PrismaClient;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  findOneById(id: string): Promise<T | null>;
  findOneByUsername(username: string): Promise<T | null>;
  findOneByEmail(email: string): Promise<T | null>;
  findAll(params: IParams): Promise<T[]>;
  countAll(params: IParams): Promise<number>;
  remove(id: string): Promise<T | null>;
  update(
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<T | null>;
}
