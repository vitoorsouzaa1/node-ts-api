import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/customer.entity';
import CustomersRepository from '../typeorm/repositories/customers.repository';

export default class listCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = customerRepository.find();

    return customer;
  }
}
