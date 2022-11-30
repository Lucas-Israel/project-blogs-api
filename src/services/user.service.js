const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return {
      error: {
        code: 'invalidCredentials',
        message: 'Invalid fields',
      },
    };
  }

  const token = jwt.sign({ email }, JWT_SECRET, { 
    expiresIn: '1h',
  });

  return { token };
};

const createUser = async ({ displayName, email, password, image }) => {
  const searching = await User.findOne({ where: { email } });

  if (searching) return { error: { code: 409, message: 'User already registered' } };

  await User.create({
    displayName,
    email,
    password,
    image,
  });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

  return { token };
};

module.exports = {
  login,
  createUser,
};