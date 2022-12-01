const Joi = require('joi');

const validateCredentials = (body) =>
  Joi.object({
    email: Joi.string().min(5).required()
    .messages({
      'string.min': '"email" length must be 5 characters long',
      'string.required': '"email" is required',
      'string.empty': 'Some required fields are missing',
    }),
    password: Joi.string().min(5).required().messages({
      'string.min': '"password" length must be 5 characters long',
      'string.required': '"password" is required',
      'string.empty': 'Some required fields are missing',
    }),
  }).validate(body);

module.exports = {
  validateCredentials,
};