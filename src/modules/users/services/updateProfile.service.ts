import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/app.errors';
import User from '../typeorm/entities/user.entity';
import UsersRepository from '../typeorm/repositories/users.repository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_pass: string;
}

export default class updateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_pass,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 401);
    }

    const userMailUpdate = await usersRepository.findByEmail(email);

    if (userMailUpdate && userMailUpdate.id !== user_id) {
      throw new AppError("There's already one user with this email.", 404);
    }

    if (password && !old_pass) {
      throw new AppError('Old password is required!', 400);
    }

    if (password && old_pass) {
      const checkOldPassword = await compare(old_pass, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old passowrd does not match!', 401);
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);
    return user;
  }
}
