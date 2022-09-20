import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/app.errors';
import User from '../typeorm/entities/user.entity';
import UsersRepository from '../typeorm/repositories/users.repository';

interface IRequest {
  user_id: string;
}

export default class showProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 401);
    }

    return user;
  }
}
