import Joi from 'joi';

export const loginValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9@#$%^&*()]{8,30}$')),
});
