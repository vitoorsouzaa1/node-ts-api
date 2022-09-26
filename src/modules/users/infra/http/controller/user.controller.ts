import { Request, Response } from 'express';
import createUserService from '../services/createUser.service';
import listUsersService from '../services/listUser.service';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async idx(req: Request, res: Response): Promise<Response> {
    const listUser = new listUsersService();

    const users = await listUser.execute();

    return res.json(instanceToInstance(users));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = new createUserService();

    const user = await createUser.execute({ name, email, password });

    return res.json(instanceToInstance(user));
  }
}
