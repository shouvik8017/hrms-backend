import { Router } from 'express';

import { loginRouter } from '../routes/authentication.route.js';

export const masterRouter = Router();

masterRouter.use('/auth', loginRouter);
