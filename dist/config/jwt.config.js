import { env } from "./env.config.js";
export const jwtConfig = {
    secret: env.jwt.secret,
    expiresIn: env.jwt.expiresIn
};
