const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Неправильный формат данных' });
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.sendCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так...' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Неправильный формат данных' });
      if (err.name === 'CastError') return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Неправильный формат данных' });
      if (err.name === 'CastError') return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};
