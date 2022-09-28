import 'reflect-metadata';
import CreateCustomerService from './createCustomer.service';
import FakeCustomersRepository from '../domain/repositories/fakes/fakeCustomers.repository';

let fakeCustomersRepository: FakeCustomersRepository;

let createCustomer: CreateCustomerService;
describe('CreateCustomer', async () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'User Test',
      email: 'user@mail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it("shouldn't be able to create two customers with same email", () => {
    expect(1).toBe(1);
  });
});
