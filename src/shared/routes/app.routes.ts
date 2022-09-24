import { Router } from 'express';
import productsRouter from '../../modules/products/productRouter/products.route';
import usersRouter from '../../modules/users/routes/users.routes';
import sessionsRouter from '../../modules/users/auth/sessions.routes';
import passwordRouter from '../../modules/users/tokens/forgotPass.route';
import profileRouter from '../../modules/users/routes/profile.routes';
import customersRoutes from '../../modules/customers/routes/customers.routes';
import ordersRouter from '../../modules/orders/routes/orders.routes';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRouter);
