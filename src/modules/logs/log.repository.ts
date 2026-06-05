import type { CreateLogDto, UpdateLogDto } from './log.dto.js';
import type { LogEntry } from './log.entity.js';

class LogRepository {
  private readonly logs: LogEntry[] = [];
  private nextId = 1;

  list(): LogEntry[] {
    return this.logs;
  }

  findById(id: number): LogEntry | null {
    return this.logs.find((log) => log.id === id) ?? null;
  }

  create(payload: CreateLogDto): LogEntry {
    const entry: LogEntry = {
      id: this.nextId++,
      inventoryItemId: payload.inventoryItemId,
      action: payload.action,
      quantity: payload.quantity,
      createdAt: new Date().toISOString(),
      ...(payload.note !== undefined ? { note: payload.note } : {}),
    };

    this.logs.unshift(entry);
    return entry;
  }

  update(id: number, payload: UpdateLogDto): LogEntry | null {
    const entry = this.findById(id);
    if (!entry) return null;

    if (payload.action !== undefined) entry.action = payload.action;
    if (payload.quantity !== undefined) entry.quantity = payload.quantity;
    if (payload.note !== undefined) entry.note = payload.note;

    return entry;
  }

  remove(id: number): boolean {
    const index = this.logs.findIndex((log) => log.id === id);
    if (index < 0) return false;
    this.logs.splice(index, 1);
    return true;
  }
}

export const logRepository = new LogRepository();
