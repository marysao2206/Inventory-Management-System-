import { AppDataSource } from "../../database/data-source.js";
import { Payment } from "./payment.entity.js";

export const paymentRepository = AppDataSource.getRepository(Payment);