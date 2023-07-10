const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const FormatError = require('../errors/format-err');
const DeleteError = require('../errors/DeleteError');

module.exports.createCard = (req, res, next) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new FormatError('Неправильный формат данных');
      next(err);
    })
    .catch(next);
};

module.exports.sendCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {  
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) throw new NotFoundError('Несуществующий ID');
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => {
          return res.status(200).send({ message: 'Успешно' });
        })
        .catch((err) => {
          if (err.name === 'CastError') throw new FormatError('Неправильный формат данных');
          next(err);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new FormatError('Неправильный формат данных');
      next(err);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) throw new NotFoundError('Несуществующий ID');
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new FormatError('Неправильный формат данных');
      next(err);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) throw new NotFoundError('Несуществующий ID');
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new FormatError('Неправильный формат данных');
      next(err);
    })
    .catch(next);
};
