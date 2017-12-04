const router = require('express').Router();
const users = require('../controllers/users.controller');

router
  .get('/', (req, res) => {
     res.render('index');
  })
  .post('/signup', users.signup)
  .post('/signin', users.signin)

module.exports = router;