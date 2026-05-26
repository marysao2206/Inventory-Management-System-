import { Router } from 'express';
import { logController } from './log.controller.js';

const logRouter = Router();

logRouter.get('/', logController.list);
logRouter.get('/:id', logController.getById);
logRouter.post('/', logController.create);
logRouter.patch('/:id', logController.update);
logRouter.delete('/:id', logController.remove);

export default logRouter;
