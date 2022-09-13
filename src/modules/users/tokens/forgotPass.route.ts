import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from './forgotPass.controller';
import resetPasswordController from './resetPass.controller';

const passwordRouter = Router();
const forgotPassController = new ForgotPasswordController();
const resetPass = new resetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({ [Segments.BODY]: { email: Joi.string().email().required() } }),
  forgotPassController.create
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPass.create
);

export default passwordRouter;
