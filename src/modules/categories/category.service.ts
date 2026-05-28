import { AppError } from "../../core/errors/app-error.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { PaginationOptions } from "../../core/utils/pagination.js";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto.js";
import { categoryRepository } from "./category.repository.js";

export class CategoryService {
  async findAll({ skip, limit }: PaginationOptions) {
    const [categories, total] = await categoryRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: "DESC" }
    });

    return { data: categories, total };
  }

  async findById(id: string) {
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundError("Category not found");
    return category;
  }

  async create(dto: CreateCategoryDto) {
    const exists = await categoryRepository.findOne({ where: { name: dto.name.trim() } });
    if (exists) throw new AppError(409, "Category name already exists");

    const category = categoryRepository.create({
      name: dto.name.trim(),
      description: dto.description?.trim() || null
    });

    return categoryRepository.save(category);
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundError("Category not found");

    if (dto.name && dto.name.trim() !== category.name) {
      const exists = await categoryRepository.findOne({ where: { name: dto.name.trim() } });
      if (exists) throw new AppError(409, "Category name already exists");
    }

    Object.assign(category, {
      name: dto.name?.trim() ?? category.name,
      description: dto.description !== undefined ? dto.description.trim() : category.description
    });

    return categoryRepository.save(category);
  }

  async remove(id: string) {
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundError("Category not found");
    await categoryRepository.remove(category);
  }
}

export const categoryService = new CategoryService();