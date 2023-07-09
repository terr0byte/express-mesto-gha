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

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.use(auth);

router.get('/users', sendUsers);
router.get('/users/:userId', sendUser);
router.get('/users/me', sendCurrentUser);

router.get('/cards', sendCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

router.patch('/404', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'NOT FOUND' });
});

module.exports = router;
