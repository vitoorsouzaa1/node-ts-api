import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrderController from '../controllers/order.controller';

const ordersRouter = Router();
const ordersController = new OrderController();

ordersRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  ordersController.show
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create
);

export default ordersRouter;
