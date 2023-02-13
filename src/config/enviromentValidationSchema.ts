import * as Joi from 'joi';

export const validationSchema = Joi.object({
  URI_MONGODB: Joi.string().required(),
});
