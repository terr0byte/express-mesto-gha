const jwt = require('jsonwebtoken');
const {
  ERROR_LOGIN,
} = require('../utils/constants');

const { JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(ERROR_LOGIN)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(ERROR_LOGIN)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
};
