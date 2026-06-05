import { SignOptions } from "jsonwebtoken";
import { env } from "./env.config.js";

export const jwtConfig: SignOptions & { secret: string } = {
  secret: env.jwt.secret,
  expiresIn: env.jwt.expiresIn as SignOptions["expiresIn"]
};
