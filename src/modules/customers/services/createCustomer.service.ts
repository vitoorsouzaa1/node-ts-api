import AppError from '../../../shared/errors/app.errors';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer.model';
import { ICustomersRepository } from '../domain/repositories/ICustomers.repository';
import { ICustomer } from '../domain/models/ICustomer.model';

@injectable()
export default class createCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already used', 400);
    }

    const customer = this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}
