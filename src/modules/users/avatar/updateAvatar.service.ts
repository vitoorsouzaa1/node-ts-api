import AppError from '@shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user.entity';
import UserRepository from '../typeorm/repositories/users.repository';
import path from 'path';
import uploadConfig from '@config/upload.config';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class updateAvatarService {
  public async execute({ avatarFilename, user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 500);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarStatus = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarStatus) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
