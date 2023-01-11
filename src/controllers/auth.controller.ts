import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user.module";
import { CreateUserInput } from "../schemas/user.schema";
import { signAccessToken, signRefreshToken } from "../service/auth.service";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import _ from "lodash";
import { verifyJwt } from "../utils/jwt";
import { Session } from "../modules/session.module";

export const createSessionHandler = catchAsync(
  async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    const message = "invalid email or password";

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError(message, 400));
    }

    if (!user.verified) {
      return next(new AppError("please verify your acoount", 400));
    }

    if (
      user.password &&
      (await user.comparePasswords(password, user.password))
    ) {
      // sign access token
      const accessToken = await signAccessToken(user);

      // sign refresh token
      const refreshToken = await signRefreshToken({ userId: user.id });

      // send tokens
      return res.status(200).json({
        status: "success",
        data: {
          accessToken,
          refreshToken,
        },
      });
    }

    return next(new AppError(message, 400));
  }
);

export const refreshAccessTokenHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const refreshToken = _.get(req, "headers.x-refresh");
    const message = "could not refresh access token";

    if (!refreshToken) {
      return res.send(message);
    }

    const decoded = verifyJwt<{ session: string }>(
      refreshToken as string,
      "refreshTokenPublicKey"
    );

    if (!decoded) {
      return res.send(message);
    }

    const session = await Session.findById(decoded.session);

    if (!session || !session.valid) {
      return res.send(message);
    }

    const user = await User.findById(session.user);

    if (user) {
      const accessToken = await signAccessToken(user);
      return res.status(200).json({
        status: "success",
        data: {
          accessToken,
        },
      });
    }
    return res.send(message);
  }
);
