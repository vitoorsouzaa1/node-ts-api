import AppError from '@shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '../typeorm/repositories/userTokens.repository';
import UserRepository from '../typeorm/repositories/users.repository';

interface IRequest {
  email: string;
}

export default class forgotPassToEmail {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User doesn't exists", 400);
    }
    console.log(user);

    const token = await userTokenRepository.generateToken(user.id);
    console.log(token);
  }
}
