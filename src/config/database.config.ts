import { DataSourceOptions } from "typeorm";
import { env } from "./env.config";

const isProduction = process.env.NODE_ENV === "production";

export const databaseConfig: DataSourceOptions = {
  type: "mysql",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: env.db.synchronize,
  migrationsRun: true,
  logging: env.db.logging,
  entities: [isProduction ? "dist/modules/**/*.entity.js" : "src/modules/**/*.entity.ts"],
  migrations: [isProduction ? "dist/database/migrations/*.js" : "src/database/migrations/*.ts"]
};
