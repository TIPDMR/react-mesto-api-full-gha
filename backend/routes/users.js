const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUserInfo, getAllUsers, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');
const { URI_REGEX } = require('../utils/constants');

router.get('/', getAllUsers);
router.get('/me', getUserInfo);
router.get('/:userId', celebrate({
  params: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfileUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(URI_REGEX),
  }),
}), updateAvatarUser);

module.exports = router;
