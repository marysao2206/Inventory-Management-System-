import { AppDataSource } from "../../database/data-source.js";
import { Supplier } from "./supplier.entity.js";

export const supplierRepository = AppDataSource.getRepository(Supplier);
