const router = require('express').Router();
const users = require('../controllers/users.controller');

router
  .get('/', (req, res) => {
     res.render('index' , {'url':'index'});
  })
  .get('/hardware', (req, res) => {
     res.render('hardware', {'url':'hardware'});
  })
  .get('/pricing', (req, res) => {
     res.render('pricing', {'url':'pricing'});
  })
  .get('/login', (req, res) => {
     res.render('login', {'url':'login'});
  })
  .get('/register', (req, res) => {
     res.render('register', {'url':'register'});
  })
  .get('/mypage', (req, res) => {
     res.render('mypage', {'url':'mypage'});
  })

module.exports = router;