

export class BaseService<T> {
    protected repository: any;
  
    constructor(repository: any) {
      this.repository = repository;
    }
  
    async create(data: T): Promise<T> {
      return this.repository.create(data);
    }
  
    async findById(id: number): Promise<T | null> {
      return this.repository.findById(id);
    }
  
    async findAll(): Promise<T[]> {
      return this.repository.findAll();
    }
  
    async update(id: number, data: Partial<T>, userId? : Number): Promise<T | null> {
      return this.repository.update(id, data);
    }
  
    async delete(id: number, userId?:number): Promise<boolean> {
     return this.repository.update(id, {
        deleteAt: new Date(), 
      });
    }
  }