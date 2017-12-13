const router = require('express').Router();
const api = require('../controllers/auth.controller');

router
  .post('/register', api.register)
  .post('/login', api.login)
  .post('/logout', api.logout)
  .post('/profile/img', api.profileImg)

module.exports = router;