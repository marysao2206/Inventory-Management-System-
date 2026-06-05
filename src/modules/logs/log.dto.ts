import type { LogAction } from './log.entity.js';

export interface CreateLogDto {
  inventoryItemId: number;
  action: LogAction;
  quantity: number;
  note?: string;
}

export interface UpdateLogDto {
  action?: LogAction;
  quantity?: number;
  note?: string;
}
