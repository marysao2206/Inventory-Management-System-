import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    totalAmount: z.number().positive(),
    status: z.string().max(30).optional()
  })
});

export const updateOrderSchema = z.object({
  body: createOrderSchema.shape.body.partial()
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>["body"];
export type UpdateOrderDto = z.infer<typeof updateOrderSchema>["body"];