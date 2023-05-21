// models/user.js
const mongoose = require('mongoose');
const { URI_REGEX } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Заголовок карточки обязателен'],
    minlength: [2, 'Заголовок карточки должен быть не короче 2 символов'],
    maxlength: [30, 'Заголовок карточки должен быть не длиннее 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Ссылка карточки не может быть пустой'],
    validate: {
      validator: (value) => URI_REGEX.test(value),
      message: (props) => `Ссылка '${props.value}' некорректна`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Владелец карточки не может быть пустым'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: String,
    default: Date.now(),
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
