const Card = require('../models/card');
const { errorHandler } = require('../utils/utils');
const Forbidden = require('../errors/Forbidden');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .populate('likes')
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send(card))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  const deleteCard = (_id) => Card.findOneAndDelete(_id);

  Card.findById({ _id: cardId })
    .orFail()
    .then((card) => {
      if (card.owner._id.valueOf() !== userId) {
        return next(new Forbidden('Доступ запрещен'));
      }
      return deleteCard(card._id)
        .then((delCard) => res.send(delCard));
    })
    .catch((err) => errorHandler(err, res, next));
};

module.exports.likeCard = (req, res, next) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  ).orFail()
    .populate('likes')
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.dislikeCard = (req, res, next) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: _id } },
    { new: true },
  ).orFail()
    .populate('likes')
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => errorHandler(err, res, next));
};
