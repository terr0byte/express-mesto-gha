const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  ERROR_NOT_FOUND,
} = require('../utils/constants');

const {
  createUser,
  sendUser,
  sendCurrentUser,
  sendUsers,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

const {
  createCard,
  sendCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[\w\-.~:\/?#\[\]@!$&`()*+,;=]*/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);

router.get('/users', sendUsers);
router.get('/users/me', sendCurrentUser);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
}), sendUser);

router.get('/cards', sendCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().pattern(/^https?:\/\/(www\.)?[\w\-.~:\/?#\[\]@!$&`()*+,;=]*/),
  }),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), deleteCard);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[\w\-.~:\/?#\[\]@!$&`()*+,;=]*/)
  }),
}), updateAvatar);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), dislikeCard);

router.patch('/404', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'NOT FOUND' });
});

module.exports = router;
