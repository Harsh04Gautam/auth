import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export const userRequired = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (user) {
    return next();
  }
  return next(new AppError("you are not logged in", 403));
};
