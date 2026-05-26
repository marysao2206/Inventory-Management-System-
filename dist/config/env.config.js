"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const toNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};
const toBoolean = (value, fallback = false) => {
    if (value === undefined)
        return fallback;
    return ["true", "1", "yes"].includes(value.toLowerCase());
};
exports.env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: toNumber(process.env.PORT, 3000),
    apiPrefix: process.env.API_PREFIX ?? "/api/v1",
    db: {
        host: process.env.DB_HOST ?? "localhost",
        port: toNumber(process.env.DB_PORT, 3306),
        username: process.env.DB_USERNAME ?? "root",
        password: process.env.DB_PASSWORD ?? "",
        database: process.env.DB_DATABASE ?? "inventory_management",
        synchronize: toBoolean(process.env.DB_SYNCHRONIZE, false),
        logging: toBoolean(process.env.DB_LOGGING, false)
    },
    jwt: {
        secret: process.env.JWT_SECRET ?? "change_me_to_a_long_random_secret",
        expiresIn: process.env.JWT_EXPIRES_IN ?? "1d"
    },
    security: {
        bcryptSaltRounds: toNumber(process.env.BCRYPT_SALT_ROUNDS, 10)
    },
    mail: {
        host: process.env.MAIL_HOST ?? "smtp.gmail.com",
        port: toNumber(process.env.MAIL_PORT, 587),
        secure: toBoolean(process.env.MAIL_SECURE, false),
        user: process.env.MAIL_USER ?? "",
        password: process.env.MAIL_PASSWORD ?? "",
        from: process.env.MAIL_FROM ?? process.env.MAIL_USER ?? ""
    }
};
