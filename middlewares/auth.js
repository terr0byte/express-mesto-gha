const jwt = require('jsonwebtoken');

const LoginError = require('../errors/login-err');

const { JWT_SECRET = 'secret-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new LoginError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
  } catch (err) {
    throw new LoginError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
