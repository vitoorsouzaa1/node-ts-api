import { Router } from 'express';
import productsRouter from '../../../src/modules/products/infra/http/productRouter/products.route';
import usersRouter from '../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../modules/users/auth/sessions.routes';
import passwordRouter from '../../modules/users/tokens/forgotPass.route';
import profileRouter from '../../modules/users/infra/http/routes/profile.routes';
import customersRoutes from '../../modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '../../modules/orders/infra/http/routes/orders.routes';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRouter);
