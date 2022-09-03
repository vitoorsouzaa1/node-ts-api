import { Router } from 'express';
import productController from '../controllers/products.controller';

const productsRouter = Router();
const productsController = new productController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
