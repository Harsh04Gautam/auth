import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export const globalErrorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(400).json({
    status: "fail",
    error: err.message,
  });
};
