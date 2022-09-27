import { Request, Response } from 'express';
import ShowProfileService from '../../../services/showProfile.service';
import updateProfileService from '../../../services/updateProfile.service';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const id = req.user.id;

    const user = await showProfile.execute({ id });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_pass } = req.body;

    const updateProfile = container.resolve(updateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_pass,
    });

    return res.json(instanceToInstance(user));
  }
}
