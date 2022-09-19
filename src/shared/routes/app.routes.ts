import { Router } from 'express';
import productsRouter from '@modules/products/productRouter/products.route';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/auth/sessions.routes';
import passwordRouter from '@modules/users/tokens/forgotPass.route';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
