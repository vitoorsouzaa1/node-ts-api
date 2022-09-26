import AppError from '../../../shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/customer.entity';
import CustomersRepository from '../infra/typeorm/repositories/customers.repository';
import { ICreateCustomer } from '../domain/models/ICreateCustomer.model';

export default class createCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
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
