import AppDataSource from "../../database/data-source";
import { Category } from "./category.entity";

export const categoryRepository = AppDataSource.getRepository(Category);
