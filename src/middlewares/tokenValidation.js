const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await userService.findUser(decoded.email);

    req.user = user;
  
    next();
  } catch (error) {
    const condition1 = error.message === 'invalid signature';
    const condition2 = error.message === 'jwt malformed';
    if (condition1 || condition2) error.message = 'Expired or invalid token';
    res.status(401).json({ message: error.message });
  }
};