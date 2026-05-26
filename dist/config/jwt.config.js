"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const env_config_1 = require("./env.config");
exports.jwtConfig = {
    secret: env_config_1.env.jwt.secret,
    expiresIn: env_config_1.env.jwt.expiresIn
};
