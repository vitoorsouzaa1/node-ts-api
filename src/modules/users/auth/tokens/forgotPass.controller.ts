import { Request, Response } from 'express';
import forgotPassToEmail from './forgotPassToEmail.service';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPassToEmail = new forgotPassToEmail();

    await sendForgotPassToEmail.execute({ email });

    return res.status(204).json();
  }
}
