import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import categoryRoutes from "../modules/categories/category.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js";
import productRoutes from "../modules/products/product.routes.js";
import supplierRoutes from "../modules/suppliers/supplier.routes.js"
import inventoryRoutes from "../modules/inventory/inventory.routes.js"
import dashboardRoutes from "../modules/dashboard/dashboard.roures.js";

import userRoutes from "../modules/users/user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use('/suppliers', supplierRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/dashboard", dashboardRoutes);
export default router;
