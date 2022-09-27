import { IUser } from './IUser.model';

export interface IUserAuthenticated {
  user: IUser;
  token: string;
}
