import AppError from '../../../shared/errors/app.errors';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUser.repository';
import { ICreateUser } from '../domain/models/ICreateUser.model';
import { IUser } from '../domain/models/IUser.model';
import { IHashProvider } from '../providers/HashProvider/IHash.provider';

@injectable()
export default class createUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const validMail = await this.usersRepository.findByEmail(email);

    if (validMail) {
      throw new AppError('Email already used', 400);
    }

    const hashPass = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashPass,
    });

    return user;
  }
}
