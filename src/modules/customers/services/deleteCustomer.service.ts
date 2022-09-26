import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/app.errors';
import Customer from '../infra/typeorm/entities/customer.entity';
import CustomersRepository from '../infra/typeorm/repositories/customers.repository';

interface IRequest {
  id: string;
}

export default class deleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 401);
    }

    await customerRepository.remove(customer);
  }
}
