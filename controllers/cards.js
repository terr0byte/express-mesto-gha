const Card = require('../models/card');
const {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_VALIDATION,
} = require('../utils/constants');

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_VALIDATION).send({ message: 'Неправильный формат данных' });
      return res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.sendCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) return Promise.reject(new Error('Invalid'));
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'Error') return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      if (err.name === 'ValidationError') return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      if (err.name === 'CastError') return res.status(ERROR_VALIDATION).send({ message: 'Неправильный формат данных' });
      return res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) return Promise.reject(new Error('Invalid'));
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'Error') return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      if (err.name === 'ValidationError') return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      if (err.name === 'CastError') return res.status(ERROR_VALIDATION).send({ message: 'Неправильный формат данных' });
      return res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) return Promise.reject(new Error('Invalid'));
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'Error') return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      if (err.name === 'ValidationError') return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      if (err.name === 'CastError') return res.status(ERROR_VALIDATION).send({ message: 'Неправильный формат данных' });
      return res.status(ERROR_CODE).send({ message: 'Что-то пошло не так...' });
    });
};
