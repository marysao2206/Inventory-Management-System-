import nodemailer from "nodemailer";
import { env } from "../../config/env.config.js";

export class MailService {
  private get isConfigured() {
    return Boolean(env.mail.host && env.mail.user && env.mail.password && env.mail.from);
  }

  async sendOtpEmail(to: string, otp: string) {
    if (!this.isConfigured) {
      if (env.nodeEnv !== "production") {
        console.log(`Email verification OTP for ${to}: ${otp}`);
      }
      return;
    }

    const transporter = nodemailer.createTransport({
      host: env.mail.host,
      port: env.mail.port,
      secure: env.mail.secure,
      auth: {
        user: env.mail.user,
        pass: env.mail.password
      }
    });

    await transporter.sendMail({
      from: env.mail.from,
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

export const mailService = new MailService();
