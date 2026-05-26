import type { CreateInventoryDto, UpdateInventoryDto } from './inventory.dro.js';
import type { InventoryItem } from './inventory.entity.js';
import { inventoryRepository } from './inventory.repository.js';

class InventoryService {
  list(): InventoryItem[] {
    return inventoryRepository.list();
  }

  getById(id: number): InventoryItem | null {
    return inventoryRepository.findById(id);
  }

  create(payload: CreateInventoryDto): InventoryItem {
    return inventoryRepository.create(payload);
  }

  update(id: number, payload: UpdateInventoryDto): InventoryItem | null {
    return inventoryRepository.update(id, payload);
  }

  remove(id: number): boolean {
    return inventoryRepository.remove(id);
  }
}

export const inventoryService = new InventoryService();
