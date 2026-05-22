import type { DataSourceOptions } from 'typeorm';
import { env } from './env.config.js';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,

  synchronize: false,
  logging: false,

  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
};
