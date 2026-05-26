"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_config_1 = require("../../config/env.config");
const app_error_1 = require("../../core/errors/app-error");
const not_found_error_1 = require("../../core/errors/not-found-error");
const user_repository_1 = require("./user.repository");
const sanitizeUser = (user) => {
    const { password, emailVerificationCodeHash, ...safeUser } = user;
    return safeUser;
};
class UserService {
    async findAll({ skip, limit }) {
        const [users, total] = await user_repository_1.userRepository.findAndCount({
            skip,
            take: limit,
            order: { createdAt: "DESC" },
            relations: { role: true }
        });
        return { data: users.map(sanitizeUser), total };
    }
    async findById(id) {
        const user = await user_repository_1.userRepository.findOne({ where: { id }, relations: { role: true } });
        if (!user)
            throw new not_found_error_1.NotFoundError("User not found");
        return sanitizeUser(user);
    }
    async create(dto) {
        const existing = await user_repository_1.userRepository.findOne({ where: { email: dto.email } });
        if (existing)
            throw new app_error_1.AppError(409, "Email is already registered");
        const user = user_repository_1.userRepository.create({
            ...dto,
            email: dto.email.trim().toLowerCase(),
            password: await bcryptjs_1.default.hash(dto.password, env_config_1.env.security.bcryptSaltRounds),
            emailVerified: true,
            emailVerifiedAt: new Date()
        });
        return sanitizeUser(await user_repository_1.userRepository.save(user));
    }
    async update(id, dto) {
        const user = await user_repository_1.userRepository.findOne({ where: { id } });
        if (!user)
            throw new not_found_error_1.NotFoundError("User not found");
        const nextPassword = dto.password
            ? await bcryptjs_1.default.hash(dto.password, env_config_1.env.security.bcryptSaltRounds)
            : user.password;
        Object.assign(user, dto, { password: nextPassword });
        return sanitizeUser(await user_repository_1.userRepository.save(user));
    }
    async remove(id) {
        const user = await user_repository_1.userRepository.findOne({ where: { id } });
        if (!user)
            throw new not_found_error_1.NotFoundError("User not found");
        await user_repository_1.userRepository.remove(user);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
