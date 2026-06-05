import type { Request, Response } from 'express';
import type { CreateLogDto, UpdateLogDto } from './log.dto.js';
import { logService } from './log.service.js';

const parseId = (id: unknown): number => {
  if (typeof id !== 'string') return Number.NaN;
  return Number.parseInt(id, 10);
};

class LogController {
  list = (_req: Request, res: Response): void => {
    res.status(200).json(logService.list());
  };

  getById = (req: Request, res: Response): void => {
    const entry = logService.getById(parseId(req.params.id));
    if (!entry) {
      res.status(404).json({ message: 'Log entry not found' });
      return;
    }
    res.status(200).json(entry);
  };

  create = (req: Request<unknown, unknown, CreateLogDto>, res: Response): void => {
    res.status(201).json(logService.create(req.body));
  };

  update = (req: Request<{ id: string }, unknown, UpdateLogDto>, res: Response): void => {
    const updated = logService.update(parseId(req.params.id), req.body);
    if (!updated) {
      res.status(404).json({ message: 'Log entry not found' });
      return;
    }
    res.status(200).json(updated);
  };

  remove = (req: Request, res: Response): void => {
    const removed = logService.remove(parseId(req.params.id));
    if (!removed) {
      res.status(404).json({ message: 'Log entry not found' });
      return;
    }
    res.status(204).send();
  };
}

export const logController = new LogController();
