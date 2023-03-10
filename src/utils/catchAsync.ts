import { NextFunction, Request, Response } from "express";

const catchAsync =
  (fn: (...args: any[]) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };

export default catchAsync;
