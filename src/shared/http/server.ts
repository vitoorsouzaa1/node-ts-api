// Package imports
import 'reflect-metadata';
import 'dotenv/config';
import { app } from '../middlewares/server.middlewares';
import { dataSource } from '../../shared/infra/typeorm/connection.orm';

dataSource.initialize().then(() => {
  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening`);
  });
});
