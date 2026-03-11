import Joi from "joi";

export const employeeCreationSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(100).required(),
    fullname: Joi.string().min(2).max(100).required(),
    role: Joi.string().valid('employee', 'manager', 'hr').required(),
    designation: Joi.string().max(100).required(),
    department: Joi.string().max(100).required()
});