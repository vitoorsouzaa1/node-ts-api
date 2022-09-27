import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/app.errors';
import { IShowUser } from '../domain/models/IShowUser.model';
import { IUser } from '../domain/models/IUser.model';
import { IUsersRepository } from '../domain/repositories/IUser.repository';

@injectable()
export default class showProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IShowUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 401);
    }

    return user;
  }
}
