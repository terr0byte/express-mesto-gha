const router = require('express').Router();

const {
  createUser,
  sendUser,
  sendUsers,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  createCard,
  sendCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/users', sendUsers);
router.get('/users/:userId', sendUser);
router.post('/users', createUser);

router.get('/cards', sendCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
