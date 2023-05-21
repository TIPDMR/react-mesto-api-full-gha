const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const JwtSecretToken = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports.checkAuthorizedUser = (req, res, next) => {
  const cookieJWT = req.cookies.jwt;

  if (!cookieJWT) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(cookieJWT, JwtSecretToken);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
