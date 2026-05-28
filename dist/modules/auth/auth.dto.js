import { z } from "zod";
export const registerSchema = z.object({
    body: z.object({
        fullName: z.string().min(2).max(150),
        email: z.string().email().max(150),
        password: z.string().min(8).max(255),
        phone: z.string().max(20).optional()
    })
});
export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(1)
    })
});
export const verifyEmailSchema = z.object({
    body: z.object({
        email: z.string().email(),
        otp: z.string().regex(/^\d{6}$/, "OTP must be a 6 digit code")
    })
});
export const resendVerificationSchema = z.object({
    body: z.object({
        email: z.string().email()
    })
});
