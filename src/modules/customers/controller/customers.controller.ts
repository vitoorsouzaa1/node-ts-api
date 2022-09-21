import { Request, Response } from 'express';
import listCustomersService from '../services/listCustomer.service';
import showCustomerService from '../services/showCustomer.service';
import createCustomerService from '../services/createCustomer.service';
import updateCustomerService from '../services/updateCustomer.service';
import deleteCustomerService from '../services/deleteCustomer.service';

export default class customersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listCustomers = new listCustomersService();

    const customers = await listCustomers.execute();

    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomer = new showCustomerService();

    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.params;

    const createCustomer = new createCustomerService();

    const customer = await createCustomer.execute({ name, email });

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateCustomer = new updateCustomerService();

    const customer = await updateCustomer.execute({ id, name, email });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCustomer = new deleteCustomerService();

    await deleteCustomer.execute({ id });

    return res.json([]);
  }
}
