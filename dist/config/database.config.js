"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const path_1 = __importDefault(require("path"));
const env_config_1 = require("./env.config");
exports.databaseConfig = {
    type: "mysql",
    host: env_config_1.env.db.host,
    port: env_config_1.env.db.port,
    username: env_config_1.env.db.username,
    password: env_config_1.env.db.password,
    database: env_config_1.env.db.database,
    synchronize: env_config_1.env.db.synchronize,
    logging: env_config_1.env.db.logging,
    entities: [path_1.default.join(__dirname, "../modules/**/*.entity.{ts,js}")],
    migrations: [path_1.default.join(__dirname, "../database/migration/*.{ts,js}")]
};
