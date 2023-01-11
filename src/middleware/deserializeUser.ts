import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { verifyJwt } from "../utils/jwt";

export const deserializeUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // get token from auth headers
    const accessToken = req.headers.authorization?.split(" ")[1];

    // if not token call next
    if (!accessToken) {
      return next();
    }

    // decode user and call next
    const decoded = await verifyJwt(accessToken, "accessTokenPublicKey");

    if (decoded) {
      res.locals.user = decoded;
    }

    return next();
  }
);
