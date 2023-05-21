// models/user.js
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Unauthorized = require('../errors/Unauthorized');
const { URI_REGEX } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    select: false,
    lowercase: true,
    required: [true, 'Email не может быть пустым'],
    unique: [true, 'Email занят другим пользователем'],
    minlength: [2, 'Email должен быть не короче 2 символов'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный email адрес',
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль не может быть пустым'],
    select: false,
    minlength: [2, 'Пароль должен быть не короче 2 символов'],
    // maxlength: [30, 'Пароль должен быть не длиннее 30 символов'],
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Имя пользователя должно быть не короче 2 символов'],
    maxlength: [30, 'Имя пользователя должно быть не длиннее 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, '`О себе` должно быть не короче 2 символов'],
    maxlength: [30, '`О себе` должно быть не длиннее 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => URI_REGEX.test(value),
      message: (props) => `Ссылка '${props.value}' некорректна`,
    },

  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password +email')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
