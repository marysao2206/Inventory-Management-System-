"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../../config/env.config");
const jwt_config_1 = require("../../config/jwt.config");
const roles_constant_1 = require("../../constants/roles.constant");
const app_error_1 = require("../../core/errors/app-error");
const mail_service_1 = require("../../core/utils/mail.service");
const token_blocklist_1 = require("../../core/utils/token-blocklist");
const auth_repository_1 = require("./auth.repository");
const VERIFICATION_TTL_MINUTES = 10;
const normalizeEmail = (email) => email.trim().toLowerCase();
const createOtp = () => (0, crypto_1.randomInt)(100000, 1_000_000).toString();
const verificationExpiry = () => new Date(Date.now() + VERIFICATION_TTL_MINUTES * 60 * 1000);
class AuthService {
    async register(dto, ipAddress) {
        const email = normalizeEmail(dto.email);
        const existingUser = await auth_repository_1.authUserRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new app_error_1.AppError(409, "Email is already registered");
        }
        const role = await auth_repository_1.roleRepository.findOne({ where: { name: roles_constant_1.RoleName.STAFF } });
        if (!role) {
            throw new app_error_1.AppError(400, "Default staff role is missing");
        }
        const otp = createOtp();
        const user = auth_repository_1.authUserRepository.create({
            fullName: dto.fullName,
            email,
            phone: dto.phone,
            roleId: role.id,
            password: await bcryptjs_1.default.hash(dto.password, env_config_1.env.security.bcryptSaltRounds),
            status: false,
            emailVerified: false,
            emailVerificationCodeHash: await bcryptjs_1.default.hash(otp, env_config_1.env.security.bcryptSaltRounds),
            emailVerificationExpiresAt: verificationExpiry()
        });
        const savedUser = await auth_repository_1.authUserRepository.save(user);
        await this.logActivity(savedUser.id, "registered account and verification code issued", ipAddress);
        await this.sendVerificationCode(savedUser.email, otp);
        return {
            message: "Registration successful. Please verify your email before logging in.",
            expiresInMinutes: VERIFICATION_TTL_MINUTES,
            devOtp: env_config_1.env.nodeEnv === "production" ? undefined : otp,
            user: {
                id: savedUser.id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                emailVerified: savedUser.emailVerified,
                status: savedUser.status
            }
        };
    }
    async login(dto, ipAddress) {
        const email = normalizeEmail(dto.email);
        const user = await auth_repository_1.authUserRepository.findOne({
            where: { email },
            relations: { role: true }
        });
        if (!user || !(await bcryptjs_1.default.compare(dto.password, user.password))) {
            throw new app_error_1.AppError(401, "Invalid email or password");
        }
        if (!user.emailVerified || !user.status) {
            throw new app_error_1.AppError(403, "Please verify your email before logging in");
        }
        await this.logActivity(user.id, "logged in", ipAddress);
        return this.toAuthResponse(user);
    }
    async logout(userId, token, tokenExpiresAt, ipAddress) {
        (0, token_blocklist_1.blockToken)(token, tokenExpiresAt ?? Date.now() + 24 * 60 * 60 * 1000);
        await this.logActivity(userId, "logged out", ipAddress);
        return {
            message: "Logout successful"
        };
    }
    async verifyEmail(dto, ipAddress) {
        const user = await auth_repository_1.authUserRepository.findOne({
            where: { email: normalizeEmail(dto.email) },
            relations: { role: true }
        });
        if (!user) {
            throw new app_error_1.AppError(400, "Invalid or expired verification code");
        }
        if (user.emailVerified) {
            return {
                message: "Email is already verified",
                user: this.toUserResponse(user)
            };
        }
        if (!user.emailVerificationCodeHash || !user.emailVerificationExpiresAt) {
            throw new app_error_1.AppError(400, "Invalid or expired verification code");
        }
        if (user.emailVerificationExpiresAt.getTime() < Date.now()) {
            throw new app_error_1.AppError(400, "Invalid or expired verification code");
        }
        const isValidOtp = await bcryptjs_1.default.compare(dto.otp, user.emailVerificationCodeHash);
        if (!isValidOtp) {
            throw new app_error_1.AppError(400, "Invalid or expired verification code");
        }
        user.emailVerified = true;
        user.status = true;
        user.emailVerifiedAt = new Date();
        user.emailVerificationCodeHash = null;
        user.emailVerificationExpiresAt = null;
        const savedUser = await auth_repository_1.authUserRepository.save(user);
        await this.logActivity(savedUser.id, "verified email and activated account", ipAddress);
        return {
            message: "Email verified. You can now login.",
            user: this.toUserResponse(savedUser)
        };
    }
    async resendVerification(dto, ipAddress) {
        const user = await auth_repository_1.authUserRepository.findOne({ where: { email: normalizeEmail(dto.email) } });
        if (!user) {
            throw new app_error_1.AppError(404, "User not found");
        }
        if (user.emailVerified) {
            return {
                message: "Email is already verified"
            };
        }
        const otp = createOtp();
        user.emailVerificationCodeHash = await bcryptjs_1.default.hash(otp, env_config_1.env.security.bcryptSaltRounds);
        user.emailVerificationExpiresAt = verificationExpiry();
        await auth_repository_1.authUserRepository.save(user);
        await this.logActivity(user.id, "verification code reissued", ipAddress);
        await this.sendVerificationCode(user.email, otp);
        return {
            message: "Verification code sent",
            expiresInMinutes: VERIFICATION_TTL_MINUTES,
            devOtp: env_config_1.env.nodeEnv === "production" ? undefined : otp
        };
    }
    async logActivity(userId, activity, ipAddress) {
        await auth_repository_1.activityLogRepository.save(auth_repository_1.activityLogRepository.create({
            userId,
            activity,
            ipAddress
        }));
    }
    async sendVerificationCode(email, otp) {
        await mail_service_1.mailService.sendOtpEmail(email, otp);
    }
    toUserResponse(user) {
        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role?.name ?? roles_constant_1.RoleName.STAFF,
            emailVerified: user.emailVerified,
            status: user.status
        };
    }
    toAuthResponse(user) {
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            role: user.role?.name ?? roles_constant_1.RoleName.STAFF
        }, jwt_config_1.jwtConfig.secret, {
            subject: user.id,
            expiresIn: jwt_config_1.jwtConfig.expiresIn
        });
        return {
            token,
            user: this.toUserResponse(user)
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
