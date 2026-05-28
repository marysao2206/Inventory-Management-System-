import { AppDataSource } from "../../database/data-source.js";
import { Order } from "./order.entity.js";

export const orderRepository = AppDataSource.getRepository(Order);