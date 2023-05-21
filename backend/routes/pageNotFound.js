const router = require('express').Router();
const { pageNotFound } = require('../controllers/pageNotFound');

router.all('/*', pageNotFound);

module.exports = router;
