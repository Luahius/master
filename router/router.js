const router = require('express').Router();
const users = require('../controllers/users.controller');

router
  .get('/', (req, res) => {
     res.render('index');
  })
  .get('/hardware', (req, res) => {
     res.render('hardware');
  })
  .get('/pricing', (req, res) => {
     res.render('pricing');
  })
  .post('/signup', users.signup)
  .post('/signin', users.signin)

module.exports = router;