import { Request, Response } from 'express';
import { container } from 'tsyringe';
import createCustomerService from '../../../services/createCustomer.service';
import deleteCustomerService from '../../../services/deleteCustomer.service';
import listCustomersService from '../../../services/listCustomer.service';
import showCustomerService from '../../../services/showCustomer.service';
import updateCustomerService from '../../../services/updateCustomer.service';

export default class customersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const listCustomers = container.resolve(listCustomersService);

    const customers = await listCustomers.execute({ page, limit });

    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomer = container.resolve(showCustomerService);

    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.params;

    const createCustomer = container.resolve(createCustomerService);

    const customer = await createCustomer.execute({ name, email });

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateCustomer = container.resolve(updateCustomerService);

    const customer = await updateCustomer.execute({ id, name, email });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCustomer = container.resolve(deleteCustomerService);

    await deleteCustomer.execute({ id });

    return res.json([]);
  }
}
