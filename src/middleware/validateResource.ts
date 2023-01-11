import { NextFunction, Request, Response } from "express";
import z from "zod";

const validateResource =
  (Schema: z.AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err) {
      return res.status(400).json({
        status: "fail",
        error: err,
      });
    }
  };

export default validateResource;
