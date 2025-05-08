import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.errors && Array.isArray(error.errors)) {
    return ApiResponse.error(
      res,
      400,
      "Erro de validação",
      error.errors.map((err: any) => ({
        field: err.property,
        message: Object.values(err.constraints).join(", "),
      }))
    );
  }
  if (error.message) {
    return ApiResponse.error(res, error.statusCode || 500, error.message);
  }
  ApiResponse.error(res, 500, "Erro interno no servidor");
};