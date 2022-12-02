const Joi = require('joi');

const FIELDS_MISSING = 'Some required fields are missing';

const validateCredentials = (body) =>
  Joi.object({
    email: Joi.string().min(5).required()
    .messages({
      'string.min': '"email" length must be 5 characters long',
      'any.required': '"email" is required',
      'string.empty': FIELDS_MISSING,
    }),
    password: Joi.string().min(5).required().messages({
      'string.min': '"password" length must be 5 characters long',
      'any.required': '"password" is required',
      'string.empty': FIELDS_MISSING,
    }),
  }).validate(body);
  
const validateUser = (body) => 
Joi.object({
  displayName: Joi.string().min(8).required()
  .messages({
    'string.min': '"displayName" length must be at least 8 characters long',
    'any.required': '"displayName" is required',
  }),
  email: Joi.string().email().required()
  .messages({
    'string.min': '"email" length must be 8 characters long',
    'any.required': '"email" is required',
  }),
  password: Joi.string().min(6).required()
  .messages({
    'string.min': '"password" length must be at least 6 characters long',
    'any.required': '"password" is required',
  }),
  image: Joi.string(),
}).validate(body);

const validateCategories = (body) => 
  Joi.object({
    name: Joi.string().required()
    .messages({
      'any.required': '"name" is required',
    }),
  }).validate(body);

const validateBlogPost = (body) => 
  Joi.object({
    title: Joi.string().required().messages({
      'any.required': FIELDS_MISSING,
    }),
    content: Joi.string().required().messages({
      'any.required': FIELDS_MISSING,
    }),
    categoryIds: Joi.array().required().messages({
      'any.required': FIELDS_MISSING,
    }),
  }).validate(body);

const validateUpdate = (body) =>
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).messages({
    'string.empty': FIELDS_MISSING,
    'any.required': FIELDS_MISSING,
  }).validate(body);

module.exports = {
  validateCredentials,
  validateUser,
  validateCategories,
  validateBlogPost,
  validateUpdate,
};