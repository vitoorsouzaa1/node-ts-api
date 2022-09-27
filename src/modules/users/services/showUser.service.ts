import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/app.errors';
import User from '../infra/typeorm/entities/user.entity';
import { IShowUser } from '../domain/models/IShowUser.model';
import { IUserRepository } from '../domain/repositories/IUser.repository';

@injectable()
export default class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ id }: IShowUser): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
