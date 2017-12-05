let { MongoClient } = require('mongodb');
let assert = require('assert');
const url = 'mongodb://icus-db:icus!icus@13.125.39.5:27017/icus';


exports.test = ((req, res) => {
  MongoClient.connect(url)
  .then(db => {
    console.log(db);
    db.close();
  })
  .catch(err => console.log(err));
  res.send('API server');
});

// user
exports.signup = ((req, res) => {
  let { email, pw, name } = req.body;
  res.json({email: email, pw: pw, name: name});
});
exports.signin = ((req, res) => {
  let { email, pw } = req.body;
  res.json({email: email, pw: pw});
});