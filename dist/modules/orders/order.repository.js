<<<<<<< HEAD
"use strict";
=======
import { AppDataSource } from "../../database/data-source.js";
import { Order } from "./order.entity.js";
export const orderRepository = AppDataSource.getRepository(Order);
>>>>>>> 41c04b2d18fa77d3ca9372aafa2db0fb5f6d726b
