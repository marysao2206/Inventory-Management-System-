"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = require("../../config/env.config");
class MailService {
    get isConfigured() {
        return Boolean(env_config_1.env.mail.host && env_config_1.env.mail.user && env_config_1.env.mail.password && env_config_1.env.mail.from);
    }
    async sendOtpEmail(to, otp) {
        if (!this.isConfigured) {
            if (env_config_1.env.nodeEnv !== "production") {
                console.log(`Email verification OTP for ${to}: ${otp}`);
            }
            return;
        }
        const transporter = nodemailer_1.default.createTransport({
            host: env_config_1.env.mail.host,
            port: env_config_1.env.mail.port,
            secure: env_config_1.env.mail.secure,
            auth: {
                user: env_config_1.env.mail.user,
                pass: env_config_1.env.mail.password
            }
        });
        await transporter.sendMail({
            from: env_config_1.env.mail.from,
            to,
            subject: "Verify your Inventory Management account",
            text: `Your verification code is ${otp}. It expires in 10 minutes.`,
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Verify your email</h2>
          <p>Your verification code is:</p>
          <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
          <p>This code expires in 10 minutes.</p>
        </div>
      `
        });
    }
}
exports.MailService = MailService;
exports.mailService = new MailService();
