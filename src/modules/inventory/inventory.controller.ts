import type { Request, Response } from 'express';
import type { CreateInventoryDto, UpdateInventoryDto } from './inventory.dro.js';
import { inventoryService } from './inventory.service.js';

const parseId = (id: unknown): number => {
  if (typeof id !== 'string') return Number.NaN;
  return Number.parseInt(id, 10);
};

class InventoryController {
  list = (_req: Request, res: Response): void => {
    res.status(200).json(inventoryService.list());
  };

  getById = (req: Request, res: Response): void => {
    const item = inventoryService.getById(parseId(req.params.id));
    if (!item) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }
    res.status(200).json(item);
  };

  create = (req: Request<unknown, unknown, CreateInventoryDto>, res: Response): void => {
    res.status(201).json(inventoryService.create(req.body));
  };

  update = (req: Request<{ id: string }, unknown, UpdateInventoryDto>, res: Response): void => {
    const updated = inventoryService.update(parseId(req.params.id), req.body);
    if (!updated) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }
    res.status(200).json(updated);
  };

  remove = (req: Request, res: Response): void => {
    const removed = inventoryService.remove(parseId(req.params.id));
    if (!removed) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }
    res.status(204).send();
  };
}

export const inventoryController = new InventoryController();
