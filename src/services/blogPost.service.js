const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models'); 
const { findUser } = require('./user.service');

const { JWT_SECRET } = process.env;

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createBlogPost = async (token, { title, content, categoryIds }) => {
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    const user = await findUser(verify.email);
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create({ title, content, userId: user.id },
        { transaction: t });

      categoryIds.forEach((value) => PostCategory.create({
        postId: blogPost.id,
        categoryId: value,
      }));

      return blogPost;
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getPost = async () => {
  const result = await BlogPost.findAll(
    { include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ] },
  );

  return { type: null, message: result };
};

const getPostById = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });

  if (!result) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  return { type: null, message: result };
};

const updatePost = async (token, id, { title, content }) => {
  const verify = jwt.verify(token, JWT_SECRET);
  const user = await findUser(verify.email);

  const { message: { dataValues: { userId } } } = await getPostById(id);

  if (userId !== user.id) return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };

  await BlogPost.update(
      { title, content },
      { where: { id } },
  );

  const result = await getPostById(id);

  return result;
};

const deletePost = async (token, id) => {
  const doesExist = await getPostById(id);

  if (doesExist.type) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  const verify = jwt.verify(token, JWT_SECRET);
  const user = await findUser(verify.email);

  const { message: { dataValues: { userId } } } = await getPostById(id);

  if (userId !== user.id) return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };

  const result = await BlogPost.destroy({
    where: { id },
  });

  return { type: null, message: result };
};

const postSearch = async (q) => {
  const { or, like } = Sequelize.Op;
  const result = await BlogPost.findAll({
    where: { [or]: [{ title: { [like]: `%${q}%` } }, { content: { [like]: `%${q}%` } }] },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });
  return { type: null, message: result };
};

module.exports = {
  createBlogPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
  postSearch,
};