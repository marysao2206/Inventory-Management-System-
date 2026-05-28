import { InventoryStatus } from "../../constants/inventory-status.constant";
import { AppError } from "../../core/errors/app-error";
import { NotFoundError } from "../../core/errors/not-found-error";
import { inventoryRepository } from "./inventory.repository";
import { CreateInventoryDto, UpdateInventoryDto } from "./inventory.dto";
import { Like } from "typeorm";

const statusFromQuantity = (quantity: number) => {
  if (quantity <= 0) return InventoryStatus.OUT_OF_STOCK;
  if (quantity <= 10) return InventoryStatus.LOW_STOCK;
  return InventoryStatus.IN_STOCK;
};

export class InventoryService {
  async findAll(pagination: { skip: number; limit: number }, search?: string) {
    const keyword = typeof search === "string" ? search.trim() : "";
    const [data, total] = keyword
      ? await inventoryRepository.findAndCount({
          where: [{ warehouseLocation: Like(`%${keyword}%`) }],
          skip: pagination.skip,
          take: pagination.limit,
          order: { updatedAt: "DESC" },
          relations: { product: true }
        })
      : await inventoryRepository.findAndCount({
          skip: pagination.skip,
          take: pagination.limit,
          order: { updatedAt: "DESC" },
          relations: { product: true }
        });
    return { data, total };
  }

  async findById(id: string) {
    const item = await inventoryRepository.findOne({ where: { id }, relations: { product: true, logs: true } });
    if (!item) throw new NotFoundError("Inventory item not found");
    return item;
  }

  async create(dto: CreateInventoryDto) {
    const quantity = Number(dto.quantity);
    if (!Number.isFinite(quantity) || quantity < 0) throw new AppError("Quantity must be a valid non-negative number", 400);

    return inventoryRepository.save(
      inventoryRepository.create({
        ...dto,
        quantity,
        status: dto.status ?? statusFromQuantity(quantity)
      })
    );
  }

  async update(id: string, dto: UpdateInventoryDto) {
    const item = await this.findById(id);
    const quantity = dto.quantity === undefined ? undefined : Number(dto.quantity);
    if (quantity !== undefined && (!Number.isFinite(quantity) || quantity < 0)) {
      throw new AppError("Quantity must be a valid non-negative number", 400);
    }
    Object.assign(item, dto, quantity === undefined ? {} : { quantity });
    if (quantity !== undefined && dto.status === undefined) item.status = statusFromQuantity(quantity);
    return inventoryRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findById(id);
    await inventoryRepository.remove(item);
  }
}

export const inventoryService = new InventoryService();
