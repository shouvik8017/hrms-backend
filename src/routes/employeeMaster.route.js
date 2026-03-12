import { Router } from "express";
import {
    createEmployeeHandler,
    updateEmployeeHandler,
    toggleEmployeeStatusHandler,
    getAllEmployeeHandler
} from "../controllers/employee/master.controller.js";
import { employeeCreationSchema, employeeUpdateSchema } from "../validations/employee/master.validation.js";
import validationRequest from "../middlewares/validation.middleware.js";
import { verifyToken, authorizeRole } from "../middlewares/auth.middleware.js";

export const employeeMasterRouter = Router();

employeeMasterRouter.use(verifyToken);
employeeMasterRouter.use(authorizeRole('admin'));

employeeMasterRouter.post('/create', validationRequest(employeeCreationSchema), createEmployeeHandler);
employeeMasterRouter.patch('/update', validationRequest(employeeUpdateSchema), updateEmployeeHandler);
employeeMasterRouter.get('/status-toggle/:empId', toggleEmployeeStatusHandler);
employeeMasterRouter.post('/lists', getAllEmployeeHandler);