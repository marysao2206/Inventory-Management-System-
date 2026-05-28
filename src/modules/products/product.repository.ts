import AppDataSource from "../../database/data-source";
import { Product } from "./product.entity";

export const productRepository = AppDataSource.getRepository(Product);
