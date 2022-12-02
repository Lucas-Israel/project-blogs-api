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

module.exports = {
  createBlogPost,
  getPost,
};