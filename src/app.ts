import express from "express";
import { globalErrorHandler } from "./controllers/error.controller";
import userRouter from "./routes/user.route";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import { deserializeUser } from "./middleware/deserializeUser";

dotenv.config();

const app = express();

app.use(express.json());

app.use(deserializeUser);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/sessions", authRouter);

//error handling middleware
app.use(globalErrorHandler);

export default app;
