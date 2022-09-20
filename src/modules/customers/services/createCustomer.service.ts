import AppError from '../../../shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/customer.entity';
import CustomersRepository from '../typeorm/repositories/customers.repository';

interface IRequest {
  name: string;
  email: string;
}

export default class createCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const validMail = await customersRepository.findByEmail(email);

    if (validMail) {
      throw new AppError('Email already used', 400);
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}
