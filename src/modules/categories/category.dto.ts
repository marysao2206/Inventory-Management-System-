import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150),
    description: z.string().max(1000).optional()
  })
});

export const updateCategorySchema = z.object({
  body: createCategorySchema.shape.body.partial()
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>["body"];
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>["body"];