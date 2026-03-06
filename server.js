import express from 'express';
import cors from 'cors';
import { dbconnection } from './src/config/db.config.js';
import { adminseed } from './src/utils/admin.seed.js';
import chalk from 'chalk';
import { masterRouter } from './src/config/master.route.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

dbconnection();

adminseed();

app.get('/', (req, res) => {
  res.send('Hi home');
});

app.use('/api/v1', masterRouter);

app.listen(port, () => {
  console.log(chalk.green(`Server started on http://localhost:${port}`));
});
