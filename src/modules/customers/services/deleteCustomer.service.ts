import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/app.errors';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer.model';
import { ICustomersRepository } from '../domain/repositories/ICustomers.repository';

@injectable()
export default class deleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 401);
    }

    await this.customersRepository.remove(customer);
  }
}
