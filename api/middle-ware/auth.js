const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = ((req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const onError = (error) => res.status(403).json({ message: error.message });
  if(!token) res.status(403).json({ message: 'not logged in' })
  else User.checkToken(token)
  .then(decoded => {
    req.decoded = decoded;
    next();
  }).catch(onError);
});