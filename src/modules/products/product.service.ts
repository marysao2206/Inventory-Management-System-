import { Brackets } from "typeorm";
import { AppError } from "../../core/errors/app-error";
import { NotFoundError } from "../../core/errors/not-found-error";
import { generateSku } from "../../core/utils/generate-sku";
import { categoryRepository } from "../categories/category.repository";
import {CreateProductDto,UpdateProductDto,} from "./product.dto";
import { productRepository } from "./product.repository";

export class ProductService {
  async findAll(
    pagination: { skip: number; limit: number },
    search?: string
  ) {
    const keyword = search?.trim();

    const query = productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .orderBy("product.createdAt", "DESC")
      .skip(pagination.skip)
      .take(pagination.limit);

    if (keyword) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where("product.name LIKE :keyword", {
            keyword: `%${keyword}%`,
          })
            .orWhere("product.sku LIKE :keyword", {
              keyword: `%${keyword}%`,
            })
            .orWhere("product.barcode LIKE :keyword", {
              keyword: `%${keyword}%`,
            });
        })
      );
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data: data.map((product) => this.mapProduct(product)),
      total,
    };
  }

  async findById(id: string) {
    const product = await this.findEntityById(id);

    return this.mapProduct(product, true);
  }

  async create(dto: CreateProductDto) {
    const categoryId = dto.categoryId?.trim();
    const createdById = dto.createdById?.trim();

    this.validateCreatedBy(createdById);
    await this.validateCategoryExists(categoryId);
    await this.validateCreatedByUserExists(createdById);

    const sku = dto.sku?.trim() || generateSku(dto.name);

    await this.checkDuplicateProduct(sku, dto.barcode);

    const price = this.validatePrice(dto.price);

    const product = productRepository.create({
      ...dto,
      categoryId,
      createdById,
      sku,
      price,
    });

    return productRepository.save(product);
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findEntityById(id);

    const updatedData: Partial<UpdateProductDto> = {
      ...dto,
    };

    if (dto.categoryId !== undefined) {
      const categoryId = dto.categoryId.trim();
      await this.validateCategoryExists(categoryId);
      updatedData.categoryId = categoryId;
    }

    if (dto.price !== undefined) {
      updatedData.price = this.validatePrice(dto.price);
    }

    Object.assign(product, updatedData);

    return productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findEntityById(id);

    await productRepository.remove(product);
  }

  private async findEntityById(id: string) {
    const product = await productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.inventoryItems", "inventoryItems")
      .where("product.id = :id", { id })
      .getOne();

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return product;
  }

  private validateCreatedBy(createdById: string) {
    if (!createdById?.trim()) {
      throw new AppError("Created by is required", 400);
    }
  }

  private async validateCategoryExists(categoryId?: string) {
    if (!categoryId?.trim()) {
      throw new AppError("Category is required", 400);
    }

    const category = await categoryRepository.findOneBy({ id: categoryId });

    if (!category) {
      throw new NotFoundError("Category not found");
    }
  }

  private async validateCreatedByUserExists(createdById: string) {
    const rows = await productRepository.manager.query(
      "SELECT id FROM users WHERE id = ? LIMIT 1",
      [createdById]
    );

    if (rows.length === 0) {
      throw new NotFoundError("Created by user not found");
    }
  }

  private validatePrice(price: string | number): number {
    const parsedPrice =
      typeof price === "number"
        ? price
        : Number(price);

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      throw new AppError(
        "Price must be a valid non-negative number",
        400
      );
    }

    return Number(parsedPrice.toFixed(2));
  }

  private async checkDuplicateProduct(
    sku: string,
    barcode?: string | null
  ) {
    const existingProduct = await productRepository.findOne({
      where: barcode
        ? [{ sku }, { barcode }]
        : [{ sku }],
    });

    if (existingProduct) {
      throw new AppError(
        "Product SKU or barcode already exists",
        409
      );
    }
  }

  private mapCategory(category: any) {
    if (!category) {
      return null;
    }

    return {
      id: category.id,
      name: category.name,
      description: category.description ?? null,
      createdAt: category.createdAt,
    };
  }

  private mapInventoryItem(inventoryItem: any) {
    return {
      id: inventoryItem.id,
      productId: inventoryItem.productId,
      warehouseLocation: inventoryItem.warehouseLocation,
      quantity: inventoryItem.quantity,
      status: inventoryItem.status,
      updatedAt: inventoryItem.updatedAt,
    };
  }

  private mapProduct(product: any, includeInventoryItems = false) {
    const mappedProduct = {
      id: product.id,
      categoryId: product.categoryId,
      createdById: product.createdById,
      name: product.name,
      sku: product.sku,
      barcode: product.barcode ?? null,
      price: product.price,
      imageUrl: product.imageUrl ?? null,
      createdAt: product.createdAt,
      category: this.mapCategory(product.category),
    };

    if (!includeInventoryItems) {
      return mappedProduct;
    }

    return {
      ...mappedProduct,
      inventoryItems: Array.isArray(product.inventoryItems)
        ? product.inventoryItems.map((inventoryItem: any) =>
            this.mapInventoryItem(inventoryItem)
          )
        : [],
    };
  }
}

export const productService = new ProductService();
