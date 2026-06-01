import path from "path";
import { fileURLToPath } from "url";
import { DataSourceOptions } from "typeorm";
import { env } from "./env.config.js";
import { ActivityLog } from "../modules/auth/activity-log.entity.js";
import { Role } from "../modules/auth/auth.entity.js";
import { Category } from "../modules/categories/category.entity.js";
import { Order } from "../modules/orders/order.entity.js";
import { Payment } from "../modules/payments/payment.entity.js";
import { Product } from "../modules/products/product.entity.js";
import { User } from "../modules/users/user.entity.js";
import { Supplier } from "../modules/suppliers/supplier.entity.js";
import { InventoryDetail, InventoryItem, InventoryLog, Stock } from "../modules/inventory/inventory.entity.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const databaseConfig: DataSourceOptions = {
  type: "mysql",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: env.db.synchronize,
  logging: env.db.logging,
  entities: [Role, User, ActivityLog, Category, Product, Order, Payment, Supplier, InventoryDetail, InventoryItem, InventoryLog, Stock],
  migrations: [path.join(__dirname, "../database/migration/*.{ts,js}")]
};
