import { z } from "zod";

export const createSupplierSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150),
    contactName: z.string().max(150).optional(),
    phone: z.string().max(20).optional(),
    email: z.string().email().max(150).optional(),
    address: z.string().max(1000).optional()
  })
});

export const updateSupplierSchema = z.object({
  body: createSupplierSchema.shape.body.partial()
});

export type CreateSupplierDto = z.infer<typeof createSupplierSchema>["body"];
export type UpdateSupplierDto = z.infer<typeof updateSupplierSchema>["body"];
