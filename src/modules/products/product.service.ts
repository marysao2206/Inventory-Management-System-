import { AppError } from "../../core/errors/app-error.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { PaginationOptions } from "../../core/utils/pagination.js";
import { CreateProductDto, UpdateProductDto } from "./product.dto.js";
import { productRepository } from "./product.repository.js";

export class ProductService {
  async findAll({ skip, limit }: PaginationOptions) {
    const [products, total] = await productRepository.findAndCount({
      skip,
      take: limit,
      relations: ["category", "supplier"],
      order: { createdAt: "DESC" }
    });

    return { data: products, total };
  }

  async findById(id: string) {
    const product = await productRepository.findOne({ 
      where: { id },
      relations: ["category", "supplier"] 
    });
    if (!product) throw new NotFoundError("Product not found");
    return product;
  }
  
  async create(dto: CreateProductDto, createdBy?: string) {
    const skuExists = await productRepository.findOne({ where: { sku: dto.sku.trim() } });
    if (skuExists) throw new AppError(409, "SKU already exists");

    if (dto.barcode) {
      const barcodeExists = await productRepository.findOne({ where: { barcode: dto.barcode.trim() } });
      if (barcodeExists) throw new AppError(409, "Barcode already exists");
    }

    const product = productRepository.create({
      category: { id: dto.categoryId},
      supplier: { id: dto.supplierId},
      name: dto.name.trim(),
      sku: dto.sku.trim(),
      barcode: dto.barcode?.trim() || null,
      price: dto.price.toFixed(2),
      imageUrl: dto.imageUrl?.trim() || null,
      createdBy: createdBy ?? null
    });

    return productRepository.save(product);
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundError("Product not found");

    if (dto.sku && dto.sku.trim() !== product.sku) {
      const skuExists = await productRepository.findOne({ where: { sku: dto.sku.trim() } });
      if (skuExists) throw new AppError(409, "SKU already exists");
    }

    if (dto.barcode && dto.barcode.trim() !== product.barcode) {
      const barcodeExists = await productRepository.findOne({ where: { barcode: dto.barcode.trim() } });
      if (barcodeExists) throw new AppError(409, "Barcode already exists");
    }

    Object.assign(product, {
      category: dto.categoryId ? { id: dto.categoryId } : product.category,
      supplier: dto.supplierId ? { id: dto.supplierId } : product.supplier,
      name: dto.name?.trim() ?? product.name,
      sku: dto.sku?.trim() ?? product.sku,
      barcode: dto.barcode !== undefined ? dto.barcode.trim() : product.barcode,
      price: dto.price !== undefined ? dto.price.toFixed(2) : product.price,
      imageUrl: dto.imageUrl !== undefined ? dto.imageUrl.trim() : product.imageUrl
    });

    return productRepository.save(product);
  }

  async remove(id: string) {
    const product = await productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundError("Product not found");
    await productRepository.remove(product);
  }
}

export const productService = new ProductService();