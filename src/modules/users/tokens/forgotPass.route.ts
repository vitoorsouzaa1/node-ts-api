import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from './forgotPass.controller';

const passwordRouter = Router();
const forgotPassController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({ [Segments.BODY]: { email: Joi.string().email().required() } }),
  forgotPassController.create
);

export default passwordRouter;
