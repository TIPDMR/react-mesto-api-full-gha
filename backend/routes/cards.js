const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, createCard, likeCard, deleteCard, dislikeCard,
} = require('../controllers/cards');
const { URI_REGEX } = require('../utils/constants');

router.get('/', getAllCards);

router.post('/', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(URI_REGEX).required(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = router;
