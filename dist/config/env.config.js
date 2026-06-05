import dotenv from "dotenv";
dotenv.config();
const toNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};
const toBoolean = (value, fallback = false) => {
    if (value === undefined)
        return fallback;
    return ["true", "1", "yes"].includes(value.toLowerCase());
};
export const env = {
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
    },
    bakong: {
        apiBaseUrl: process.env.BAKONG_API_BASE_URL ?? "https://api-bakong.nbc.gov.kh",
        accountCheckUrl: process.env.BAKONG_ACCOUNT_CHECK_URL ?? "https://api-bakong.nbc.gov.kh/v1/check_bakong_account",
        apiToken: process.env.BAKONG_API_TOKEN ?? "",
        merchantId: process.env.BAKONG_MERCHANT_ID ?? "",
        merchantName: process.env.BAKONG_MERCHANT_NAME ?? "My Store",
        merchantCity: process.env.BAKONG_MERCHANT_CITY ?? "Phnom Penh",
        currency: process.env.BAKONG_CURRENCY ?? "KHR",
        expirationSeconds: toNumber(process.env.BAKONG_EXPIRATION_SECONDS, 900)
    }
};
