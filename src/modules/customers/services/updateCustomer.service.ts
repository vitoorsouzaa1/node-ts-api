import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/app.errors';
import Customer from '../infra/typeorm/entities/customer.entity';
import { ICustomersRepository } from '../domain/repositories/ICustomers.repository';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer.model';

@injectable()
export default class updateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 401);
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError("There's already one customer with this email.", 404);
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);
    return customer;
  }
}
