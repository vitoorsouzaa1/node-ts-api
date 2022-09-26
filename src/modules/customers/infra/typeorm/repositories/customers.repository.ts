import { Repository } from 'typeorm';
import { ICustomersRepository } from '../../../domain/repositories/ICustomers.repository';
import { ICustomerPaginate } from '../../../domain/models/ICustomerPaginate.model';
import { ICreateCustomer } from '../../../domain/models/ICreateCustomer.model';
import Customer from '../entities/customer.entity';
import { dataSource } from 'shared/infra/typeorm/connection.orm';
import { ICustomer } from 'modules/customers/domain/models/ICustomer.model';
import { SearchParams } from '../../../domain/repositories/ICustomers.repository';

export default class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async findByName(name: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({ name });

    return customer;
  }

  public async findById(id: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({ id });

    return customer;
  }

  public async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({ email });

    return customer;
  }
}
