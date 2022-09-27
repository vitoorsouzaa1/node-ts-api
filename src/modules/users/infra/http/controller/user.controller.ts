import { Request, Response } from 'express';
import { container } from 'tsyringe';
import createUserService from '../../../services/createUser.service';
import listUsersService from '../../../services/listUser.service';
import showUsersService from '../../../services/showUser.service';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async idx(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const listUser = container.resolve(listUsersService);

    const users = await listUser.execute({ page, limit });

    return res.json(instanceToInstance(users));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUser = container.resolve(showUsersService);

    const user = await showUser.execute({ id });

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(createUserService);

    const user = await createUser.execute({ name, email, password });

    return res.json(instanceToInstance(user));
  }
}
