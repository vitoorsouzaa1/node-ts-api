import { Request, Response, Router } from 'express';

export const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello!' });
});
