import { Request, Response } from 'express';
import ShowProfileService from '../services/showProfile.service';
import updateProfileService from '../services/updateProfile.service';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = req.user.id;

    const user = await showProfile.execute({ user_id });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_pass } = req.body;

    const updateProfile = new updateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_pass,
    });

    return res.json(user);
  }
}
