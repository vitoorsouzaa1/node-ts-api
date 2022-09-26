import { Request, Response } from 'express';
import createSesssionsService from './createSessions.service';
import { instanceToInstance } from 'class-transformer';
export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessions = new createSesssionsService();

    const user = await createSessions.execute({ email, password });

    return res.json(instanceToInstance(user));
  }
}
