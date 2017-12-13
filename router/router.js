const router = require('express').Router();
const users = require('../controllers/users.controller');
const http = require('http');
const dataFromAPI = require('../middle-ware/data-from-api');

router.use('/login', dataFromAPI);
router.use('/register', dataFromAPI);

router
  .get('/', (req, res) => {
    let sess = req.session;
    res.render('index' , { url:'index', subnav: true , token: sess.token });
  })
  .get('/hardware', (req, res) => {
    let sess = req.session;
    res.render('hardware', { url:'hardware', subnav: true , token: sess.token  });
  })
  .get('/pricing', (req, res) => {
    let sess = req.session;
    res.render('pricing', { url:'pricing', subnav: false , token: sess.token });
  })
  .get('/login', (req, res) => {
    let sess = req.session;
    res.render('login', { url:'login', subnav: false , token: sess.token });
  })
  .get('/register', (req, res) => {
    let sess = req.session;
    res.render('register', { url:'register', subnav: false , token: sess.token });
  })
  .get('/mypage', (req, res) => {
    let sess = req.session;
    res.render('mypage', { url:'mypage', subnav: false , token: sess.token });
  })
  .get('/host', (req, res) => {
    let sess = req.session;
    res.render('host', { url:'host', subnav: true , token: sess.token });
  })
  .post('/login' , (req, res) => {
    let chunk = req.body.chunk;
    let token = JSON.parse(chunk).token;
    if(!token) {
      res.redirect('/login');
      return;
    }
    let sess = req.session;
    sess.token = token;
    res.redirect('/');
  })
  .post('/register' , (req, res) => {
    res.redirect('/login');
  })

module.exports = router;