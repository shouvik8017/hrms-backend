import { Router } from "express";
import { createEmployeeHandler } from "../controllers/employee/master.controller.js";
import { employeeCreationSchema } from "../validations/employee/master.validation.js";
import validationRequest from "../middlewares/validation.middleware.js";
import { verifyToken, authorizeRole } from "../middlewares/auth.middleware.js";

export const employeeMasterRouter = Router();

employeeMasterRouter.use(verifyToken);
employeeMasterRouter.use(authorizeRole('admin'));

employeeMasterRouter.post('/create', validationRequest(employeeCreationSchema), createEmployeeHandler);