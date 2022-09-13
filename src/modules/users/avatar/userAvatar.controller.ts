import { Request, Response } from 'express';
import UpdateAvatarService from './updateAvatar.service';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateAvatarService();

    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file!.filename,
    });

    return res.json(user);
  }
}
