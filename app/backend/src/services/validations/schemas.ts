import * as Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
  password: Joi.string().min(6),
});

export const a = 1;
