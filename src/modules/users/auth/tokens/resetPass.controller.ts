import { Request, Response } from 'express';
import resetPasswordService from '../../auth/tokens/forgotPassToEmail.service';

export default class resetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    const resetPassword = new resetPasswordService();

    await resetPassword.execute({ password, token });

    return res.status(204).json();
  }
}
