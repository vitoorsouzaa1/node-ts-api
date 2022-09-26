import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/customer.entity';
import CustomersRepository from '../infra/typeorm/repositories/customers.repository';

interface IPaginateCustomer {
  per_page: number;
  total: number;
  current_page: number;
  data: Customer[];
}
export default class listCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.find();

    return customers;
  }
}
