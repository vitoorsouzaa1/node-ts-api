import nodemailer from 'nodemailer';
import mailHandlebar from './mailTemplate.handlebar';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IMailTemplateParse {
  template: string;
  variables: ITemplateVariables;
}
interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IMailTemplateParse;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new mailHandlebar();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Api Vendas',
        address: from?.email || 'support@apivendas.com.br',
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
