const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = ((req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token || req.session.token;
  const onError = (error) => res.status(403).json({ message: error.message });
  if(!token) res.redirect('/login')
  else User.validate(token)
  .then(decoded => {
    req.decoded = decoded;
    next();
  }).catch(onError);
});