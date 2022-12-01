const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(authorization, JWT_SECRET);
  
    res.status(200).json(decoded);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};