import { Response } from "express";

export const ApiResponse = {
  success: (res: Response, status: number, data: any, message?: string) => {
    return res.status(status).json({ status, success: true, data, message });
  },

  error: (res: Response, status: number, message: string, details?: any) => {
    return res.status(status).json({ status, success: false, message, details });
  },
};