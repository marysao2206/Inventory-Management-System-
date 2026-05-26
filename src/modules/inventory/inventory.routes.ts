import { Router } from 'express';
import { inventoryController } from './inventory.controller.js';

const inventoryRouter = Router();

inventoryRouter.get('/', inventoryController.list);
inventoryRouter.get('/:id', inventoryController.getById);
inventoryRouter.post('/', inventoryController.create);
inventoryRouter.patch('/:id', inventoryController.update);
inventoryRouter.delete('/:id', inventoryController.remove);

export default inventoryRouter;
