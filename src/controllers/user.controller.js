const { userService } = require('../services/index');

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

module.exports = {
  login,
};