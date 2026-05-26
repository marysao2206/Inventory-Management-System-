import path from "path";
import { DataSourceOptions } from "typeorm";
import { env } from "./env.config";

export const databaseConfig: DataSourceOptions = {
  type: "mysql",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: env.db.synchronize,
  logging: env.db.logging,
  entities: [path.join(__dirname, "../modules/**/*.entity.{ts,js}")],
  migrations: [path.join(__dirname, "../database/migration/*.{ts,js}")]
};
