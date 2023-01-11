import jwt from "jsonwebtoken";

export const signJwt = async (
  object: object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) => {
  const privateKey =
    keyName === "accessTokenPrivateKey"
      ? process.env.ACCESS_TOKEN_PRIVATE_KEY
      : process.env.REFRESH_TOKEN_PRIVATE_KEY;

  // be careful, non null assersion used
  return jwt.sign(object, privateKey!, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
  try {
    const publicKey =
      keyName === "accessTokenPublicKey"
        ? process.env.ACCESS_TOKEN_PUBLIC_KEY
        : process.env.REFRESH_TOKEN_PUBLIC_KEY;

    // be careful, non null assersion used
    const decode = jwt.verify(token, publicKey!) as T;
    return decode;
  } catch (err) {
    return null;
  }
};
