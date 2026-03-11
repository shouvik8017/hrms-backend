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

dbconnection().then(() => {
  adminseed();
});

app.get('/', (req, res) => {
  res.send('Hi home');
});

app.use('/api/v1', masterRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  console.error(`[Error]: ${err.message}`); // Log for internal use

  res.status(status).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An internal error occurred' 
      : err.message, // Hide details in production
  });
});

process.on('uncaughtException', (err) => {
  console.error('CRITICAL: Uncaught Exception!', err);
  // Perform cleanup (e.g., close DB connections)
  process.exit(1); // Force exit; the process is in an "unclean" state
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(port, () => {
  console.log(chalk.green(`Server started on http://localhost:${port}`));
});
