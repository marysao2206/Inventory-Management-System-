export interface CreateCategoryDto {
  name: string;
  description?: string | null;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
