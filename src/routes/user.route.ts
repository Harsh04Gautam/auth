import express from "express";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controllers/user.controller";
import { userRequired } from "../middleware/userRequired";
import validateResource from "../middleware/validateResource";
import {
  CreateUserSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyUserSchema,
} from "../schemas/user.schema";

const userRouter = express.Router();

// create user
userRouter.post("/", validateResource(CreateUserSchema), createUserHandler);

// verify user
userRouter.post(
  "/verify/:id/:verificationCode",
  validateResource(VerifyUserSchema),
  verifyUserHandler
);

// forgot password
userRouter.post(
  "/forgotPassword",
  validateResource(ForgotPasswordSchema),
  forgotPasswordHandler
);

// reset password
userRouter.post(
  "/resetPassword/:id/:resetPasswordCode",
  validateResource(ResetPasswordSchema),
  resetPasswordHandler
);

// me
userRouter.get("/me", userRequired, getCurrentUserHandler);

export default userRouter;
