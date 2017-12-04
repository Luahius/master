let { MongoClient } = require('mongodb');
let assert = require('assert');
const url = 'mongodb://localhost:27017/icus';

exports.signup = ((req, res) => {
  let { email, pw, name } = req.body;
  res.json({email: email, pw: pw, name: name});
});
exports.signin = ((req, res) => {
  let { email, pw } = req.body;
  res.json({email: email, pw: pw});
});