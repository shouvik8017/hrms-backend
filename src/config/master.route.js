import { Router } from 'express';

import { loginRouter } from '../routes/authentication.route.js';
import { employeeMasterRouter } from '../routes/employeeMaster.route.js';

export const masterRouter = Router();

masterRouter.use('/auth', loginRouter);
masterRouter.use('/employee', employeeMasterRouter);
