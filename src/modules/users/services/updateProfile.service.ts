import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/app.errors';
import { IUsersRepository } from '../domain/repositories/IUser.repository';
import { IUpdateProfile } from '../domain/models/IUpdateProfile.model';
import { IUser } from '../domain/models/IUser.model';

@injectable()
export default class updateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_pass,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 401);
    }

    const userMailUpdate = await this.usersRepository.findByEmail(email);

    if (userMailUpdate && userMailUpdate.id !== user_id) {
      throw new AppError("There's already one user with this email.", 404);
    }

    if (password && !old_pass) {
      throw new AppError('Old password is required!', 400);
    }

    if (password && old_pass) {
      const checkOldPassword = await compare(old_pass, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old passowrd does not match!', 401);
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);
    return user;
  }
}
