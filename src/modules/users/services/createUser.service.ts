import AppError from '@shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user.entity';
import UserRepository from '../typeorm/repositories/users.repository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class createUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const validMail = await usersRepository.findByEmail(email);

    if (validMail) {
      throw new AppError('Email already used', 400);
    }

    const hashPass = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashPass,
    });

    await usersRepository.save(user);

    return user;
  }
}
