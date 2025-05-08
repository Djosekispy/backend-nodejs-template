import { PrismaClient } from '@prisma/client';

export abstract class BaseRepository<T>{
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findUnique({ where: { id , deletedAt : null} });
  }


  async create(data: Partial<T>): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.model.update({ where: { id },
      deleteAt : new Date().toISOString()
    });
  }
}
