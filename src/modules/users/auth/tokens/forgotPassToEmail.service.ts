import AppError from '../../../../shared/errors/app.errors';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import EtherealMail from '../../../../config/mailer/etherealMail';
import { ISendForgotPasswordEmail } from '../../domain/models/ISendForgotPasswordEmail.model';
import { IUsersRepository } from '../../domain/repositories/IUser.repository';
import { IUserTokensRepository } from '../../domain/repositories/IUserToken.repository';

@injectable()
export default class forgotPassToEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}
  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User doesn't exists", 400);
    }
    console.log(user);

    const { token } = await this.userTokensRepository.generateToken(user.id);

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
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
