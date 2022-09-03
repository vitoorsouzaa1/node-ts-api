import { Router } from 'express';
import productsRouter from 'src/modules/products/productRouter/products.route';

export const routes = Router();

routes.use('/products', productsRouter);
