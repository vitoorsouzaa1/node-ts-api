import { Request, Response } from 'express';
import { container } from 'tsyringe';
import resetPasswordService from '../../../users/services/resetPassword.service';

export default class resetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    const resetPassword = container.resolve(resetPasswordService);

    await resetPassword.execute({ password, token });

    return res.status(204).json();
  }
}
