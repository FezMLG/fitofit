import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  API_PORT: Joi.number().default(3000),
});
