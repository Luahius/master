const { MongoClient } = require('mongodb');
const { dbUrl } = require('../config/database.config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { secret } = require('../config/jwt.config');

let cryptoPW = (password) => {
  return crypto.createHmac('sha1', secret) .update(password) .digest('base64');
}

exports.create = (email, pw, name, phone) => {
  let user = {
    email: email,
    pw: cryptoPW(pw),
    name: name,
    phone: phone
  }
  return MongoClient.connect(dbUrl)
  .then(db => db.collection('users').insertOne(user))
}
exports.findOneByEmail = (email) => {
  return MongoClient.connect(dbUrl)
  .then(db => db.collection('users').findOne({email: email}))
}
exports.verify = (pwByUser, pwByDB) => {
  pwByUser = cryptoPW(pwByUser);
  return pwByUser == pwByDB;
}
exports.getToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone
      },
      secret,
      {
        expiresIn: '7d',
        issuer: 'ICus',
        subject: 'userInfo'
      },
      (err, token) => {
        if(err) reject(err);
        resolve(token);
      }
    )
  });
}
exports.checkToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) reject(err);
      resolve(decoded);
    });
  });
}