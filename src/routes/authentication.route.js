import { Router } from 'express';

import { loginController } from '../controllers/authentication/login.controller.js';
import { loginValidation } from '../validations/authentication/login.validation.js';
import validationRequest from '../middlewares/validation.middleware.js';

export const loginRouter = Router();

loginRouter.post('/login', validationRequest(loginValidation), loginController);
