const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middlewares/logger');

const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./routes/auth');
const pageNotFound = require('./routes/pageNotFound');
const handleGeneralError = require('./middlewares/handleGeneralError');
const corsFilters = require('./middlewares/cors');
const { checkAuthorizedUser } = require('./middlewares/auth');

/**
 * Подключение переменных из .env
 */
require('dotenv').config();

const { PORT = 3000, MONGO_DB_URI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

/**
 * Подключение к базе данных
 */
mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
});

/**
 * Запуск приложения
 * @type {*|Express}
 */
const app = express();

/**
 * Подключаем логгер запросов
 */
app.use(requestLogger);

/**
 * Разные middleware
 */
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * CORS
 */
app.use(corsFilters);

/**
 * Роуты приложения
 */
app.use('/', auth);
app.use('/users', checkAuthorizedUser, users);
app.use('/cards', checkAuthorizedUser, cards);
app.use('*', pageNotFound);

/**
 * Подключаем логгер ошибок
 */
app.use(errorLogger);

/**
 * Middleware Celebrate
 * Обработчик ошибок celebrate
 */
app.use(celebrateErrors());

/**
 * Централизованный обработчик ошибок
 */
app.use(handleGeneralError);

app.listen(PORT);
