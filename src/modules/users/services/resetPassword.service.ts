import AppError from '../../../shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import UserTokensRepository from '../typeorm/repositories/userTokens.repository';
import UserRepository from '../typeorm/repositories/users.repository';

interface IRequest {
  token: string;
  password: string;
}

export default class resetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User Token does't exists", 400);
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User doesn't exists", 400);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Expired token', 400);
    }

    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}
