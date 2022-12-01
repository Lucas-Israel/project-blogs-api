const { Category } = require('../models');

const createCategory = async (name) => {
  const result = await Category.create({ name });

  return { type: null, message: result.dataValues };
};

const getAll = async () => {
  const result = await Category.findAll();

  return { type: null, message: result };
};

const findByIdList = async (list) => {
  const listing = await Promise.all(list.map((id) => {
    const result = Category.findByPk(id);
    return result;
  }));

  if (listing.some((ele) => ele === null)) return { type: 'NOT_FOUND' };

  return { type: null, message: listing };
};

module.exports = {
  createCategory,
  getAll,
  findByIdList,
};