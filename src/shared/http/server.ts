// Package imports
import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

// Route import
import { routes } from '../routes/app.routes';

// Middlewares imports
import AppError from '../errors/app.errors';
import '../typeorm/connection.orm';
import { errors } from 'celebrate';

const app = express();

app.use(cors());

app.use(express.json());

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

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

// Server listening
const PORT = 4444;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
