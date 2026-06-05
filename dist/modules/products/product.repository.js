import { AppDataSource } from "../../database/data-source.js";
import { Product } from "./product.entity.js";
export const productRepository = AppDataSource.getRepository(Product);
