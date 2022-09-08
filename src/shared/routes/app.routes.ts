import { Router } from 'express';
import productsRouter from 'src/modules/products/productRouter/products.route';
import { usersRouter } from 'src/modules/users/routes/users.routes';
import { sessionsRouter } from 'src/modules/users/auth/sessions.routes';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
