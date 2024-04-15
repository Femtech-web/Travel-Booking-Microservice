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
