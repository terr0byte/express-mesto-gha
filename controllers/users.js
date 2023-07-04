const User = require('../models/user');
const {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_VALIDATION,
} = require('../utils/constants');

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({ message: 'Неправильный формат данных' });
      return res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.sendUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) return Promise.reject(new Error('Invalid'));
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'Error') return res.status(ERROR_NOT_FOUND).send({ message: 'Несуществующий ID' });
      if (err.name === 'CastError') return res.status(ERROR_VALIDATION).send({ message: 'Неправильный формат данных' });
      return res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.sendUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' }));
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'TypeError' || err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({ message: 'Неправильный формат данных' });
      if (err.name === 'CastError') return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      return res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({ message: 'Неправильный формат данных' });
      if (err.name === 'CastError') return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      return res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' });
    });
};
