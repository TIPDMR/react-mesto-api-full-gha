const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  login,
  createUser, logout,
} = require('../controllers/users');
const { URI_REGEX } = require('../utils/constants');

router.post('/signin', celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(URI_REGEX),
  }),
}), createUser);

router.get('/signout', logout);

module.exports = router;
