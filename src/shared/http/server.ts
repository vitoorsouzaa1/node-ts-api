import express, { NextFunction, Request, response, Response } from 'express';
import cors from 'cors';
import { routes } from './routes/routes';
import { AppError } from './errors/app.errors';

const app = express();

app.use(cors());

app.use(express.json());

// Route Middleware
app.use(routes);

// Error Middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

// Server listening
const PORT = 4444;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
