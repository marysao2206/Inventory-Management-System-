export interface CreateProductDto {
  categoryId: string;
  createdById: string;
  name: string;
  sku?: string;
  barcode?: string | null;
  price: string | number;
  imageUrl?: string | null;
}

export interface UpdateProductDto
  extends Partial<Omit<CreateProductDto, "createdById">> {}
