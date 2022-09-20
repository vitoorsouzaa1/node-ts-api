import AppError from '@shared/errors/app.errors';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '../typeorm/repositories/userTokens.repository';
import UserRepository from '../typeorm/repositories/users.repository';
import EtherealMail from '@config/mailer/etherealMail';

interface IRequest {
  email: string;
}

export default class forgotPassToEmail {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User doesn't exists", 400);
    }
    console.log(user);

    const { token } = await userTokenRepository.generateToken(user.id);

    const forgotPassTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPassTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:4444/reset_password?token=${token}`,
        },
      },
    });
  }
}
