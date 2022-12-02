const { blogPostService } = require('../services');
const { validateBlogPost } = require('./utils/validations');
const { categoryService } = require('../services');

const createBlogPost = async (req, res) => {
  const { error } = validateBlogPost(req.body);

  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  const { title, content, categoryIds } = req.body;
  const { type } = await categoryService.findByIdList(categoryIds);

  if (type) return res.status(400).json({ message: 'one or more "categoryIds" not found' });

  const token = req.header('Authorization');
  const result = await blogPostService.createBlogPost(token, { title, content, categoryIds });
  
  res.status(201).json(result);
};

const getPost = async (req, res) => {
  const { message } = await blogPostService.getPost();

  res.status(200).json(message);
};

module.exports = {
  createBlogPost,
  getPost,
};