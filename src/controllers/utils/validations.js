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
  
const validateUser = (body) => 
Joi.object({
  displayName: Joi.string().min(8).required()
  .messages({
    'string.min': '"displayName" length must be at least 8 characters long',
    'string.required': '"displayName" is required',
  }),
  email: Joi.string().email().required()
  .messages({
    'string.min': '"email" length must be 8 characters long',
    'string.required': '"email" is required',
  }),
  password: Joi.string().min(6).required()
  .messages({
    'string.min': '"password" length must be at least 6 characters long',
    'string.required': '"password" is required',
  }),
  image: Joi.string(),
}).validate(body);

const validateCategories = (body) => 
  Joi.object({
    name: Joi.string().required()
    .messages({
      'string.required': '"name" is required',
    }),
  }).validate(body);

module.exports = {
  validateCredentials,
  validateUser,
  validateCategories,
};