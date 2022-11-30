const { userService } = require('../services/index');
const { validateUser } = require('./utils/validadeUser');
const { validateCredentials } = require('./utils/validateCredentials');

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

module.exports = {
  login,
  createUser,
};