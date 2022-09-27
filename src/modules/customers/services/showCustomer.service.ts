import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/app.errors';
import Customer from '../infra/typeorm/entities/customer.entity';
import { ICustomersRepository } from '../domain/repositories/ICustomers.repository';
import { IShowCustomer } from '../domain/models/IShowCustomer.model';

@injectable()
export default class showCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 401);
    }

    return customer;
  }
}
