import { Repository } from 'typeorm';
import UserToken from '../entities/userToken.entity';
import { IUserTokensRepository } from '../../../domain/repositories/IUserToken.repository';
import { dataSource } from '../../../../../shared/infra/typeorm/connection.orm';

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOneBy({ token });

    return userToken;
  }

  public async generateToken(user_id: string): Promise<UserToken> {
    const userToken = await this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
