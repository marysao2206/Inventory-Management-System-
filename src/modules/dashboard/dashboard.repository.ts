import { categoryRepository } from "../categories/category.repository.js";
import { inventoryItemRepository } from "../inventory/inventory.repository.js";
import { orderRepository } from "../orders/order.repository.js";
import { paymentRepository } from "../payments/payment.repository.js";
import { productRepository } from "../products/product.repository.js";
import { supplierRepository } from "../suppliers/supplier.repository.js";
import { userRepository } from "../users/user.repository.js";

export class DashboardRepository {
  async getSummary() {
    const [
      totalUsers,
      totalCategories,
      totalProducts,
      totalSuppliers,
      totalOrders,
      totalPayments,
      totalInventoryItems
    ] = await Promise.all([
      userRepository.count(),
      categoryRepository.count(),
      productRepository.count(),
      supplierRepository.count(),
      orderRepository.count(),
      paymentRepository.count(),
      inventoryItemRepository.count()
    ]);

    return {
      totalUsers,
      totalCategories,
      totalProducts,
      totalSuppliers,
      totalOrders,
      totalPayments,
      totalInventoryItems
    };
  }
}

export const dashboardRepository = new DashboardRepository();
