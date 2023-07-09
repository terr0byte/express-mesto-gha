const jwt = require('jsonwebtoken');
const {
  ERROR_LOGIN,
} = require('../utils/constants');

const { JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res
      .status(ERROR_LOGIN)
      .send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
  } catch (err) {
    return res
      .status(ERROR_LOGIN)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
