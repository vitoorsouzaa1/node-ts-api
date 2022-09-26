// Package imports
import 'reflect-metadata';
import 'dotenv/config';
import { app } from '../../middlewares/server.middlewares';
import { dataSource } from '../typeorm/connection.orm';

const PORT = process.env.PORT;

dataSource.initialize().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
});
