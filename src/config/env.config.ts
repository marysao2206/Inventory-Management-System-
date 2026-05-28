import dotenv from "dotenv";

dotenv.config();

type DatabaseEnv = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
};

type AppEnv = {
  port: number;
  apiPrefix: string;
};

type JwtEnv = {
  secret: string;
  expiresIn: string;
};

const toBoolean = (value: string | undefined, fallback = false) => {
  if (value === undefined) {
    return fallback;
  }
  return value.toLowerCase() === "true";
};

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  app: {
    port: toNumber(process.env.PORT, 3000),
    apiPrefix: process.env.API_PREFIX ?? "/api"
  } as AppEnv,
  db: {
    host: process.env.DB_HOST ?? "localhost",
    port: toNumber(process.env.DB_PORT, 3308),
    username: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_DATABASE ?? "inventory_management",
    synchronize: toBoolean(process.env.DB_SYNCHRONIZE, false),
    logging: toBoolean(process.env.DB_LOGGING, false)
  } as DatabaseEnv,
  jwt: {
    secret: process.env.JWT_SECRET ?? "change-me",
    expiresIn: process.env.JWT_EXPIRES_IN ?? "1d"
  } as JwtEnv
};
