const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const FormatError = require('../errors/format-err');
const LoginError = require('../errors/login-err');
const RegisterError = require('../errors/register-err');

const { JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        throw new RegisterError('Пользователь с таким email уже существует');
      }
      if (err.name === 'ValidationError') throw new FormatError('Неправильный формат данных');
    })
    .catch(next);
};

module.exports.sendUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) throw new NotFoundError('Несуществующий ID');
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new FormatError('Неправильный формат данных');
    })
    .catch(next);
};

module.exports.sendCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) throw new NotFoundError('Несуществующий ID');
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new FormatError('Неправильный формат данных');
    })
    .catch(next);
};

module.exports.sendUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new FormatError('Неправильный формат данных');
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new FormatError('Неправильный формат данных');
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.cookie(jwt, token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .send();
    })
    .catch(() => {
      throw new LoginError('Неправильные почта или пароль');
    })
    .catch(next);
};
