const { Category } = require('../models');

const createCategory = async (name) => {
  const result = await Category.create({ name });

  return { type: null, message: result.dataValues };
};

module.exports = {
  createCategory,
};