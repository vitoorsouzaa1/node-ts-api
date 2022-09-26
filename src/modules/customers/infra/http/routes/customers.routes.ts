import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import isAuthenticated from '../../../../users/middlewares/auth.middleware';
import CustomersController from '../controller/customers.controller';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customersController.list);

customersRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  customersController.show
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.create
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  customersController.update
);

customersRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  customersController.delete
);

export default customersRouter;
