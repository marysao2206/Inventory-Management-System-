import bcrypt from "bcryptjs";
import { randomInt } from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.config.js";
import { jwtConfig } from "../../config/jwt.config.js";
import { RoleName } from "../../constants/roles.constant.js";
import { AppError } from "../../core/errors/app-error.js";
import { mailService } from "../../core/utils/mail.service.js";
import { blockToken } from "../../core/utils/token-blocklist.js";
import { LoginDto, RegisterDto, ResendVerificationDto, VerifyEmailDto } from "./auth.dto.js";
import { activityLogRepository, authUserRepository, roleRepository } from "./auth.repository.js";

const VERIFICATION_TTL_MINUTES = 10;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const createOtp = () => randomInt(100000, 1_000_000).toString();

const verificationExpiry = () => new Date(Date.now() + VERIFICATION_TTL_MINUTES * 60 * 1000);

export class AuthService {
  async register(dto: RegisterDto, ipAddress?: string) {
    const email = normalizeEmail(dto.email);
    const existingUser = await authUserRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError(409, "Email is already registered");
    }

    const role = await roleRepository.findOne({ where: { name: RoleName.STAFF } });

    if (!role) {
      throw new AppError(400, "Default staff role is missing");
    }

    const otp = createOtp();
    const user = authUserRepository.create({
      fullName: dto.fullName,
      email,
      phone: dto.phone,
      roleId: role.id,
      password: await bcrypt.hash(dto.password, env.security.bcryptSaltRounds),
      status: false,
      emailVerified: false,
      emailVerificationCodeHash: await bcrypt.hash(otp, env.security.bcryptSaltRounds),
      emailVerificationExpiresAt: verificationExpiry()
    });

    const savedUser = await authUserRepository.save(user);
    await this.logActivity(savedUser.id, "registered account and verification code issued", ipAddress);
    await this.sendVerificationCode(savedUser.email, otp);

    return {
      message: "Registration successful. Please verify your email before logging in.",
      expiresInMinutes: VERIFICATION_TTL_MINUTES,
      devOtp: env.nodeEnv === "production" ? undefined : otp,
      user: {
        id: savedUser.id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        emailVerified: savedUser.emailVerified,
        status: savedUser.status
      }
    };
  }

  async login(dto: LoginDto, ipAddress?: string) {
    const email = normalizeEmail(dto.email);
    const user = await authUserRepository.findOne({
      where: { email },
      relations: { role: true }
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new AppError(401, "Invalid email or password");
    }

    if (!user.emailVerified || !user.status) {
      throw new AppError(403, "Please verify your email before logging in");
    }

    await this.logActivity(user.id, "logged in", ipAddress);

    return this.toAuthResponse(user);
  }

  async logout(userId?: string, token?: string, tokenExpiresAt?: number, ipAddress?: string) {
    if (!token) {
      return {
        message: "You are already logged out"
      };
    }

    if (token) {
      blockToken(token, tokenExpiresAt ?? Date.now() + 24 * 60 * 60 * 1000);
    }

    if (userId) {
      await this.logActivity(userId, "logged out", ipAddress);
    }

    return {
      message: "Logout successful"
    };
  }

  async verifyEmail(dto: VerifyEmailDto, ipAddress?: string) {
    const user = await authUserRepository.findOne({
      where: { email: normalizeEmail(dto.email) },
      relations: { role: true }
    });

    if (!user) {
      throw new AppError(400, "Invalid or expired verification code");
    }

    if (user.emailVerified) {
      return {
        message: "Email is already verified",
        user: this.toUserResponse(user)
      };
    }

    if (!user.emailVerificationCodeHash || !user.emailVerificationExpiresAt) {
      throw new AppError(400, "Invalid or expired verification code");
    }

    if (user.emailVerificationExpiresAt.getTime() < Date.now()) {
      throw new AppError(400, "Invalid or expired verification code");
    }

    const isValidOtp = await bcrypt.compare(dto.otp, user.emailVerificationCodeHash);
    if (!isValidOtp) {
      throw new AppError(400, "Invalid or expired verification code");
    }

    user.emailVerified = true;
    user.status = true;
    user.emailVerifiedAt = new Date();
    user.emailVerificationCodeHash = null;
    user.emailVerificationExpiresAt = null;

    const savedUser = await authUserRepository.save(user);
    await this.logActivity(savedUser.id, "verified email and activated account", ipAddress);

    return {
      message: "Email verified. You can now login.",
      user: this.toUserResponse(savedUser)
    };
  }

  async resendVerification(dto: ResendVerificationDto, ipAddress?: string) {
    const user = await authUserRepository.findOne({ where: { email: normalizeEmail(dto.email) } });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if (user.emailVerified) {
      return {
        message: "Email is already verified"
      };
    }

    const otp = createOtp();
    user.emailVerificationCodeHash = await bcrypt.hash(otp, env.security.bcryptSaltRounds);
    user.emailVerificationExpiresAt = verificationExpiry();
    await authUserRepository.save(user);
    await this.logActivity(user.id, "verification code reissued", ipAddress);
    await this.sendVerificationCode(user.email, otp);

    return {
      message: "Verification code sent",
      expiresInMinutes: VERIFICATION_TTL_MINUTES,
      devOtp: env.nodeEnv === "production" ? undefined : otp
    };
  }

  private async logActivity(userId: string, activity: string, ipAddress?: string) {
    await activityLogRepository.save(
      activityLogRepository.create({
        userId,
        activity,
        ipAddress
      })
    );
  }

  private async sendVerificationCode(email: string, otp: string) {
    await mailService.sendOtpEmail(email, otp);
  }

  private toUserResponse(user: { id: string; email: string; fullName: string; role?: { name: string }; emailVerified?: boolean; status?: boolean }) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role?.name ?? RoleName.STAFF,
      emailVerified: user.emailVerified,
      status: user.status
    };
  }

  private toAuthResponse(user: { id: string; email: string; fullName: string; role?: { name: string } }) {
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role?.name ?? RoleName.STAFF
      },
      jwtConfig.secret,
      {
        subject: user.id,
        expiresIn: jwtConfig.expiresIn
      }
    );

    return {
      token,
      user: this.toUserResponse(user)
    };
  }
}

export const authService = new AuthService();
