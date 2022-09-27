import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowOrderService from '../../../services/showOrder.service';
import CreateOrderService from '../../../services/createOrder.service';
import ListOrderService from '../../../services/listOrder.service';

export default class OrderController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return res.json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ customer_id, products });

    return res.json(order);
  }
}
