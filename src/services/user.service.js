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
    expiresIn: '7D',
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

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7D' });

  return { token };
};

const getUsers = async () => {
  const result = await User.findAll();

  const resultNoPw = result.map((ele) => {
    const { password, ...others } = ele.dataValues;
    return { password: undefined, ...others };
  });

  return { type: null, message: resultNoPw };
};

const findUser = async (email) => {
  const result = await User.findOne({
    where: { email },
  });

  const { password, ...others } = result.dataValues;

  return { password: undefined, ...others };
};

const findUserById = async (id) => {
  const result = await User.findOne({
    where: { id },
  });

  if (!result) return { type: 'USER_NOT_FOUND', message: result };

  result.dataValues.password = undefined;

  return { type: null, message: result };
};

module.exports = {
  login,
  createUser,
  getUsers,
  findUser,
  findUserById,
};