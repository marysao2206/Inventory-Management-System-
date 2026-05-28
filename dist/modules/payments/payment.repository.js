<<<<<<< HEAD
"use strict";
=======
import { AppDataSource } from "../../database/data-source.js";
import { Payment } from "./payment.entity.js";
export const paymentRepository = AppDataSource.getRepository(Payment);
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b
