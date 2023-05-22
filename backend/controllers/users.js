const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { errorHandler } = require('../utils/utils');
const Conflict = require('../errors/Conflict');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const JwtToken = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.getUser = (req, res, next) => {
  const _id = req.params.userId;
  User.findById({ _id })
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  const createUser = (hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  });

  User.findOne({ email })
    .select('+password')
    .then((existingUser) => {
      if (existingUser) {
        return next(new Conflict('Email занят другим пользователем'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => createUser(hash))
    .then((user) => res.status(201).send({
      _id: user._id, email: user.email, name: user.name, about: user.about, avatar: user.avatar,
    }))
    .catch(() => next);
};

module.exports.updateProfileUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JwtToken,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        }).send({ email: user.email, name: user.name });
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
  }).send({});
};
