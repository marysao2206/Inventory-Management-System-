import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    orderId: z.string(),
    transactionId: z.string().max(255).optional(),
    khqrToken: z.string().optional(),
    amount: z.number().positive(),
    paymentMethod: z.string().max(50).optional(),
    status: z.string().max(30).optional(),
    paidAt: z.coerce.date().optional()
  })
});

export const updatePaymentSchema = z.object({
  body: createPaymentSchema.shape.body.partial()
});

export const generateQRSchema = z.object({
  body: z.object({
    amount: z.number().positive("Amount must be positive"),
    merchantId: z.string().min(1, "Merchant ID is required").optional(),
    merchantName: z.string().optional(),
    merchantCity: z.string().optional(),
    currency: z.enum(["KHR", "USD"]).optional(),
    orderId: z.string().optional()
  })
});

export const checkTransactionSchema = z.object({
  body: z.object({
    md5: z.string().min(1, "md5 is required")
  })
});

export type GenerateQRDto = z.infer<typeof generateQRSchema>;
export type CheckTransactionDto = z.infer<typeof checkTransactionSchema>["body"];
export type CreatePaymentDto = z.infer<typeof createPaymentSchema>["body"];
export type UpdatePaymentDto = z.infer<typeof updatePaymentSchema>["body"];
