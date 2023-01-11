import express from "express";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controllers/auth.controller";
import validateResource from "../middleware/validateResource";
import { CreateSessionSchema } from "../schemas/session.schema";

const authRouter = express.Router();

authRouter.post(
  "/",
  validateResource(CreateSessionSchema),
  createSessionHandler
);

authRouter.post("/refresh", refreshAccessTokenHandler);

export default authRouter;
