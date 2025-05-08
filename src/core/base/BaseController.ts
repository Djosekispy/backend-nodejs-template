import { NextFunction, Request, Response } from "express";

export default abstract class BaseController<T> {
  constructor(private service: any) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const data = req.body;
      const result = await this.service.create(data);
      return res.status(201).json({ message: "Registro criado com sucesso", result });
    } catch (error) {
      
      return next(error);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const result = await this.service.findAll();
      return res.status(200).json({result});
    } catch (error) {
      return next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);
      const result = await this.service.findById(id);
      if (!result) {
       throw "Registro não encontrado" ;
      }
      return res.status(200).json({result});
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const result = await this.service.update(id, data);
      if (!result) {
       throw "Registro não encontrado" ;
      }
      return res.status(200).json({ message: "Registro atualizado com sucesso", result });
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);
       await this.service.delete(id);
      return res.status(200).json({ message: "Registro deletado com sucesso" });
    } catch (error) {
      return next(error);
    }
  };
}
