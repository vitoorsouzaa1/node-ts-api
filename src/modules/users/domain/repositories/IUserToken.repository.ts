import { IUserToken } from '../models/IUserToken.model';

export interface IUserTokensRepository {
  findByToken(token: string): Promise<IUserToken | null>;
  generateToken(user_id: string): Promise<IUserToken>;
}
