import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/users.repository';
import User from '../typeorm/entities/user.entity';

export default class listUsersService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}
