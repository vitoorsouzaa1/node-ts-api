import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUser.repository';
import { IPaginateUser } from '../domain/models/IPaginateUser.model';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class listUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IPaginateUser> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const users = await this.usersRepository.findAll({
      page,
      skip,
      take,
    });

    return users;
  }
}
