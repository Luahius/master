const router = require('express').Router();
const users = require('../controllers/users.controller');

router
  .get('/', (req, res) => {
     res.render('index');
  })

module.exports = router;