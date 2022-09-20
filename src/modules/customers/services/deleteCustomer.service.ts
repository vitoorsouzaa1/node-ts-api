import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/app.errors';
import Customer from '../typeorm/entities/customer.entity';
import CustomersRepository from '../typeorm/repositories/customers.repository';

interface IRequest {
  user_id: string;
}

export default class deleteCustomerService {
  public async execute({ user_id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(user_id);

    if (!customer) {
      throw new AppError('Customer not found.', 401);
    }

    await customerRepository.remove(customer);
  }
}
