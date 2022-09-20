import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/app.errors';
import Customer from '../typeorm/entities/customer.entity';
import CustomersRepository from '../typeorm/repositories/customers.repository';

interface IRequest {
  id: string;
}

export default class showCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 401);
    }

    return customer;
  }
}
