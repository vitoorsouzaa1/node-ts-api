import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/app.errors';
import Customer from '../infra/typeorm/entities/customer.entity';
import CustomersRepository from '../infra/typeorm/repositories/customers.repository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class updateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 401);
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError("There's already one customer with this email.", 404);
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);
    return customer;
  }
}
