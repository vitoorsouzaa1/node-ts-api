import express from 'express';
import cors from 'cors';
import { routes } from './routes/routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

const PORT = 4444;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
