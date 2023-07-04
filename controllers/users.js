const User = require('../models/user');

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Неправильный формат данных' });
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.sendUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.sendUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так...' }));
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Неправильный формат данных' });
      if (err.name === 'CastError') return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Неправильный формат данных' });
      if (err.name === 'CastError') return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};
