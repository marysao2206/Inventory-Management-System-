import { Like } from "typeorm";
import { NotFoundError } from "../../core/errors/not-found-error";
import {CreateCategoryDto,UpdateCategoryDto,} from "./category.dto";
import { categoryRepository } from "./category.repository";

export class CategoryService {
  async findAll(
    pagination: { skip: number; limit: number },
    search?: string
  ) {
    const keyword = search?.trim();

    const queryOptions = {
      skip: pagination.skip,
      take: pagination.limit,
      order: {
        createdAt: "DESC" as const,
      },
    };

    const [data, total] =
      await categoryRepository.findAndCount(
        keyword
          ? {
              ...queryOptions,
              where: [
                { name: Like(`%${keyword}%`) },
                {
                  description: Like(
                    `%${keyword}%`
                  ),
                },
              ],
            }
          : queryOptions
      );

    return { data, total };
  }

  async findById(id: string) {
    const category =
      await categoryRepository.findOneBy({
        id,
      });

    if (!category) {
      throw new NotFoundError(
        "Category not found"
      );
    }

    return category;
  }

  async create(dto: CreateCategoryDto) {
    const category =
      categoryRepository.create(dto);

    return categoryRepository.save(category);
  }

  async update(
    id: string,
    dto: UpdateCategoryDto
  ) {
    const category = await this.findById(id);

    Object.assign(category, dto);

    return categoryRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.findById(id);

    await categoryRepository.remove(category);
  }
}

export const categoryService =new CategoryService();
