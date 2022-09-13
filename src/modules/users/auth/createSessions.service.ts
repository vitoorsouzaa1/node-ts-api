import AppError from '@shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user.entity';
import UserRepository from '../typeorm/repositories/users.repository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth.config';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class SessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    const comparePass = await compare(password, user.password);

    if (!comparePass) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    await usersRepository.save(user);

    return { user, token };
  }
}
