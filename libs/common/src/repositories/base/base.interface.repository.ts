export interface IRepository {
  aggregate(...args: any): Promise<any>;
  count(...args: any): Promise<number>;
  create(...args: any): Promise<any>;
  createMany(...args: any): Promise<any[]>;
  delete(...args: any): Promise<any>;
  findFirst(...args: any): Promise<any>;
  findFirstOrThrow(...args: any): Promise<any>;
  findMany(...args: any): Promise<any[]>;
  findUnique(...args: any): Promise<any>;
  findUniqueOrThrow(...args: any): Promise<any>;
  update(...args: any): Promise<any>;
  updateMany(...args: any): Promise<any[]>;
  upsert(...args: any): Promise<any>;
}

// // Define the PrismaRepository class implementing IRepository
// export class PrismaRepository<T extends keyof PrismaClient> implements IRepository<T> {
//   private readonly model: T;

//   constructor(private readonly prisma: PrismaService, model: T) {
//     this.model = model;
//   }

//   // Implement all repository methods here
//   // ...
// }

// export interface IRepository<T> {
//   _model: Prisma<T>;
//   create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
//   findOneById(id: string): Promise<T>;
//   findOneByUsername(username: string): Promise<T | null>;
//   findOneByEmail(email: string): Promise<T | null>;
//   findAll(params: IParams): Promise<T[]>;
//   countAll(params: IParams): Promise<number>;
//   remove(id: string): Promise<T | null>;
//   update(
//     id: string,
//     data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>,
//   ): Promise<T | null>;
// }
