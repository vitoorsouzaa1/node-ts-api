import AppError from '../../../shared/errors/app.errors';
import { inject, injectable } from 'tsyringe';
import { sign, Secret } from 'jsonwebtoken';
import authConfig from '../../../config/auth.config';
import { IUsersRepository } from '../domain/repositories/IUser.repository';
import { IHashProvider } from '../providers/HashProvider/IHash.provider';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated.model';
import { ICreateSessions } from '../domain/models/ICreateSession.model';

@injectable()
export default class SessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessions): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    const passConfirmed = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passConfirmed) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    await this.usersRepository.save(user);

    return { user, token };
  }
}
