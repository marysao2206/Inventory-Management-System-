import type { CreateLogDto, UpdateLogDto } from './log.dto.js';
import type { LogEntry } from './log.entity.js';
import { logRepository } from './log.repository.js';

class LogService {
  list(): LogEntry[] {
    return logRepository.list();
  }

  getById(id: number): LogEntry | null {
    return logRepository.findById(id);
  }

  create(payload: CreateLogDto): LogEntry {
    return logRepository.create(payload);
  }

  update(id: number, payload: UpdateLogDto): LogEntry | null {
    return logRepository.update(id, payload);
  }

  remove(id: number): boolean {
    return logRepository.remove(id);
  }
}

export const logService = new LogService();
