const { blogPostService } = require('../services');
const { validateBlogPost, validateUpdate } = require('./utils/validations');
const { categoryService } = require('../services');
const { mapError } = require('../utils/errorMap');

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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await blogPostService.getPostById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const updatePost = async (req, res) => {
  const { error } = validateUpdate(req.body);

  if (error) return res.status(400).json({ message: error.message }); 

  const token = req.header('Authorization');
  const { id } = req.params;
  const { title, content } = req.body;
  const { type, message } = await blogPostService.updatePost(token, id, { title, content });

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.header('Authorization');
  const { type, message } = await blogPostService.deletePost(token, id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(204).json(message);
};

module.exports = {
  createBlogPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
};