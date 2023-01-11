import mongoose from "mongoose";
import { CreateUserInput } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import config from "config";
import { v4 as uuid } from "uuid";

type TUser = Omit<CreateUserInput, "passwordConfirmation"> & {
  verificationCode: string;
  verified: boolean;
  resetPasswordCode: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type TUserMethods = {
  comparePasswords: (
    candidatePassword: string,
    originalPassword: string
  ) => Promise<boolean>;
};

type TUserModel = mongoose.Model<TUser, {}, TUserMethods>;

export const privateFields = [
  "password",
  "verificationCode",
  "resetPasswordCode",
  "verified",
  "__v",
];

const userSchema = new mongoose.Schema<TUser, TUserModel, TUserMethods>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: () => uuid(),
    },
    resetPasswordCode: String,
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const saltRounds = config.get<string>("saltRounds");
  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword: string,
  originalPassword: string
) {
  const match = await bcrypt.compare(candidatePassword, originalPassword);
  return match;
};

export const User = mongoose.model<TUser, TUserModel>("User", userSchema);
