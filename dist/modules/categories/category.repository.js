import { AppDataSource } from "../../database/data-source.js";
import { Category } from "./category.entity.js";
export const categoryRepository = AppDataSource.getRepository(Category);
