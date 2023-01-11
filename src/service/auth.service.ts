import mongoose from "mongoose";
import { Session } from "../modules/session.module";
import { signJwt } from "../utils/jwt";
import _ from "lodash";
import { privateFields } from "../modules/user.module";

export const signRefreshToken = async ({
  userId,
}: {
  userId: mongoose.Schema.Types.ObjectId;
}) => {
  const session = await Session.create({ user: userId });
  const refreshToken = await signJwt(
    { session: session.id },
    "refreshTokenPrivateKey",
    { expiresIn: "1y" }
  );

  return refreshToken;
};

export const signAccessToken = async (user: mongoose.Document) => {
  const userJsonObject = _.omit(user.toJSON(), privateFields);

  const accessToken = await signJwt(userJsonObject, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });

  return accessToken;
};
