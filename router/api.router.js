const router = require('express').Router();
const api = require('../controllers/api.controller');

router
  .get('/', api.test)
  .post('/signup', api.signup)
  .post('/signin', api.signin)

module.exports = router;