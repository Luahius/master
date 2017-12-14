const router = require('express').Router();
const auth = require('../controllers/auth.controller');
const profile = require('../controllers/profile.controller');
const validateToken = require('../middle-ware/auth');

router
  // auth router
  .get('/auth/logout', auth.logout)
  .post('/auth/register', auth.register)
  .post('/auth/login', auth.login)

  // profile router
  .post('/profile/image', validateToken, profile.setImage)

module.exports = router;