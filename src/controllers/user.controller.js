const { userService } = require('../services/index');
const { validateCredentials, validateUser } = require('./utils/validations');
const { mapError } = require('../utils/errorMap');

const login = async (req, res, next) => {
  const { error } = validateCredentials(req.body);

  if (error) return res.status(400).json({ message: error.message });

  const { email, password } = req.body;
  const result = await userService.login(email, password);

  if (result.error && result.error.code === 'invalidCredentials') {
    return res.status(400).json({ message: result.error.message });
  }

  if (result.error) return next(result.error);

  res.status(200).json(result);
};

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).json({ message: error.message });

  const { body } = req;
  const result = await userService.createUser(body);

  if (result.error) return res.status(result.error.code).json({ message: result.error.message });

  res.status(201).json({ token: result.token });
};

const getUsers = async (req, res) => {
  const { type, message } = await userService.getUsers();

  if (type) return res.status(mapError(type)).json({ message: 'User not found' });

  res.status(200).json(message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.findUserById(id);

  if (type) return res.status(mapError(type)).json({ message: 'User does not exist' });
  res.status(200).json(message);
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUserById,
};