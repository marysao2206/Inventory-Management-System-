import { AppDataSource } from "../../database/data-source.js";
import type { CreateInventoryDto, ReceiveStockDto, UpdateInventoryDto } from "./inventory.dto.js";
import { InventoryDetail, InventoryItem, InventoryLog, InventoryStatus, Stock } from "./inventory.entity.js";

export const inventoryItemRepository = AppDataSource.getRepository(InventoryItem);

const toStatus = (quantity: number, explicit?: InventoryStatus): InventoryStatus => {
  if (explicit) return explicit;
  if (quantity <= 0) return "OUT_OF_STOCK";
  if (quantity <= 5) return "LOW_STOCK";
  return "IN_STOCK";
};

class InventoryRepository {
  private readonly items = AppDataSource.getRepository(InventoryItem);
  private readonly logs = AppDataSource.getRepository(InventoryLog);
  private readonly details = AppDataSource.getRepository(InventoryDetail);
  private readonly stocks = AppDataSource.getRepository(Stock);

  listItems() {
    return this.items.find({ order: { updatedAt: "DESC" } });
  }

  findItemById(id: string) {
    return this.items.findOne({ where: { id } });
  }

  async createItem(payload: CreateInventoryDto, userId?: string) {
    const item = await this.items.save(
      this.items.create({
        productId: payload.productId,
        warehouseLocation: payload.warehouseLocation?.trim() || null,
        quantity: payload.quantity,
        status: toStatus(payload.quantity, payload.status)
      })
    );

    await this.logs.save(
      this.logs.create({
        inventoryItemId: item.id,
        actionType: "CREATE",
        quantity: payload.quantity,
        note: "Inventory item created",
        createdBy: userId ?? null
      })
    );

    return item;
  }

  async updateItem(id: string, payload: UpdateInventoryDto, userId?: string) {
    const item = await this.findItemById(id);
    if (!item) return null;

    if (payload.productId !== undefined) item.productId = payload.productId;
    if (payload.warehouseLocation !== undefined) item.warehouseLocation = payload.warehouseLocation.trim() || null;
    if (payload.quantity !== undefined) item.quantity = payload.quantity;
    item.status = toStatus(item.quantity ?? 0, payload.status ?? item.status ?? undefined);

    const saved = await this.items.save(item);
    await this.logs.save(
      this.logs.create({
        inventoryItemId: saved.id,
        actionType: "UPDATE",
        quantity: payload.quantity ?? null,
        note: "Inventory item updated",
        createdBy: userId ?? null
      })
    );

    return saved;
  }

  async removeItem(id: string, userId?: string) {
    const item = await this.findItemById(id);
    if (!item) return false;

    await this.logs.save(
      this.logs.create({
        inventoryItemId: item.id,
        actionType: "DELETE",
        quantity: item.quantity ?? null,
        note: "Inventory item deleted",
        createdBy: userId ?? null
      })
    );
    await this.items.remove(item);
    return true;
  }

  listLogs() {
    return this.logs.find({ order: { createdAt: "DESC" } });
  }

  listStocks() {
    return this.stocks.find({ order: { createdAt: "DESC" } });
  }

  async receiveStock(payload: ReceiveStockDto, userId?: string) {
    return AppDataSource.transaction(async (manager) => {
      const items = manager.getRepository(InventoryItem);
      const details = manager.getRepository(InventoryDetail);
      const stocks = manager.getRepository(Stock);
      const logs = manager.getRepository(InventoryLog);

      let item = await items.findOne({ where: { productId: payload.productId } });
      const nextQuantity = (item?.quantity ?? 0) + payload.quantity;

      if (!item) {
        item = items.create({
          productId: payload.productId,
          warehouseLocation: payload.warehouseLocation?.trim() || null,
          quantity: nextQuantity,
          status: toStatus(nextQuantity)
        });
      } else {
        item.quantity = nextQuantity;
        item.status = toStatus(nextQuantity);
        if (payload.warehouseLocation !== undefined) {
          item.warehouseLocation = payload.warehouseLocation.trim() || null;
        }
      }

      const savedItem = await items.save(item);
      const detail = await details.save(
        details.create({
          inventoryItemId: savedItem.id,
          productId: payload.productId,
          userId: userId ?? null
        })
      );
      const stock = await stocks.save(
        stocks.create({
          detailId: detail.id,
          supplyId: payload.supplierId,
          qty: payload.quantity,
          unitPrice: payload.unitPrice,
          userId: userId ?? null
        })
      );
      const log = await logs.save(
        logs.create({
          inventoryItemId: savedItem.id,
          actionType: "STOCK_IN",
          quantity: payload.quantity,
          note: payload.note?.trim() || "Stock received",
          createdBy: userId ?? null
        })
      );

      return { inventoryItem: savedItem, inventoryDetail: detail, stock, inventoryLog: log };
    });
  }
}

export const inventoryRepository = new InventoryRepository();
