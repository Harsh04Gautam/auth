import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user.module";
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../schemas/user.schema";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import logger from "../utils/logger";
import { sendMail } from "../utils/mailer";
import { v4 as uuid } from "uuid";

export const createUserHandler = catchAsync(
  async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    _next: NextFunction
  ) => {
    // create user
    const user = await User.create(req.body);

    // send verification details
    const mailText = `use this details to verify your account \nid: ${user.id} \nvarification code: ${user.verificationCode} `;
    sendMail({
      to: req.body.email,
      from: "golu123@gmail.com",
      subject: "verify your account",
      text: mailText,
    });

    res.status(200).json({
      status: "success",
      message: "user created successfully",
    });
  }
);

export const verifyUserHandler = catchAsync(
  async (req: Request<VerifyUserInput>, res: Response, next: NextFunction) => {
    // find user
    const { id, verificationCode } = req.params;

    const user = await User.findById(id);

    // check if user exist
    if (!user) {
      return next(new AppError("could not verify user", 400));
    }

    // check if user is already verified
    if (user.verified) {
      return res.status(200).json({
        message: "user already verified",
      });
    }

    // check if verification code is correct
    if (user.verificationCode && user.verificationCode === verificationCode) {
      // if yes, verify user
      user.verified = true;
      await user.save();

      // send response
      return res.status(200).json({
        status: "success",
        message: "user verified successfully",
      });
    }

    // if not
    return next(new AppError("could not verify user", 400));
  }
);

export const forgotPasswordHandler = catchAsync(
  async (
    req: Request<{}, {}, ForgotPasswordInput>,
    res: Response,
    _next: NextFunction
  ) => {
    const { email } = req.body;
    const message = `we will send mail to ${email} if it is a verified email address`;

    // find user with eamil
    const user = await User.findOne({ email });

    // if user with this email does not exists
    if (!user) {
      logger.error(`user with email:${email} does not exists 🔴`);

      // send generaic message
      return res.send(message);
    }

    // if user exists create reset password code and send it
    const resetPasswordCode = uuid();
    const mailText = `your reset password code is ${resetPasswordCode} and id is ${user.id}. please ignore this message if you did not ask for it.`;

    user.resetPasswordCode = resetPasswordCode;
    await user.save();

    sendMail({
      to: email,
      from: "golu123@gmail.com",
      subject: "reset password code",
      text: mailText,
    });

    logger.info(`password reset email sent to ${email}`);
    // send the same genaric message
    return res.send(message);
  }
);

export const resetPasswordHandler = catchAsync(
  async (
    req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
    res: Response,
    _next: NextFunction
  ) => {
    const { password } = req.body;
    const { id, resetPasswordCode } = req.params;

    // find user
    const user = await User.findById(id);

    // if not user
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "could not reset the password",
      });
    }

    // if valid resetPasswordCode
    if (
      user.resetPasswordCode &&
      user.resetPasswordCode === resetPasswordCode
    ) {
      user.password = password;
      user.resetPasswordCode = null;
      await user.save();

      return res.status(200).json({
        status: "success",
        message: "password reset successfully",
      });
    }

    // if not
    return res.status(400).json({
      status: "fail",
      message: "could not reset the password",
    });
  }
);

export const getCurrentUserHandler = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const user = res.locals.user;

    return res.send(user);
  }
);
