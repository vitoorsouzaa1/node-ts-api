import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

// Route import
import { routes } from '../routes/app.routes';

// Middlewares imports
import AppError from '../errors/app.errors';
import '../typeorm/connection.orm';
import { errors } from 'celebrate';
import uploadConfig from '../../config/upload.config';

export const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

// Route Middleware
app.use(routes);

// Error Middlewares
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
  console.log(error);
  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});
