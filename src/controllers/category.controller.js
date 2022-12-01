const { categoryService } = require('../services');
const { mapError } = require('../utils/errorMap');
const { validateCategories } = require('./utils/validations');

const createCategory = async (req, res) => {
  const { error } = validateCategories(req.body);

  if (error) return res.status(400).json({ message: error.message });

  const { name } = req.body;
  const { type, message } = await categoryService.createCategory(name);

  if (type) return res.status(mapError(type)).json({ message });
  
  res.status(201).json(message);
};

const getAll = async (req, res) => {
  const { message } = await categoryService.getAll();

  res.status(200).json(message);
};

module.exports = {
  createCategory,
  getAll,
};