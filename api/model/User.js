const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const { dbUrl } = require('../config/database.config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { secret } = require('../config/jwt.config');
const formidable = require('formidable');
const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
const BUCKET = 'com.icus';
const BUCKET_PATH = 'profile/image';
const PUBLIC_READ = 'public-read';
/*
  User Auth
*/
// 비밀번호 암호화
const cryptoPW = password => crypto.createHmac('sha1', secret).update(password).digest('base64');
// 회원가입
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
// 해당 Email에 대한 정보 찾기
exports.findOneByEmail = (email) => {
  return MongoClient.connect(dbUrl)
  .then(db => db.collection('users').findOne({email: email}))
}
// 비밀번호 확인
exports.verify = (pwByUser, pwByDB) => {
  pwByUser = cryptoPW(pwByUser);
  return pwByUser == pwByDB;
}
// 새로운 token 발행
exports.newToken = user => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: user._id,
        email: user.email
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
// token 유효성 검사
exports.validate = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) reject(err);
      resolve(decoded);
    });
  });
}
/*
  User Profile
*/
// Image를 form에서 parse 합니다 
exports.parseImage = req => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
      if(!file.hasOwnProperty('image') || err) reject({ message: 'No file' });
      resolve(file);
    });
  });
}
// 이전 이미지를 S3에서 삭제합니다
exports.deleteImgFromS3 = (key, file) => {
  const keyPath = key.substring(key.lastIndexOf('/') + 1, key.length);
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    s3.deleteObject({ Bucket: BUCKET, Key: `${BUCKET_PATH}/${keyPath}` }, (err, data) => {
      if(err) reject(err);
      resolve(file);
    });
  });
}
// S3에 업로드합니다
exports.uploadImgToS3 = file => {
  // 이미지 파일인지 확인합니다
  const isImage = type => type.substring(0, type.indexOf('/'));
  // file name을 가져옵니다.
  const getFileName = name => name.substring(0, name.indexOf('.'));
  // file type을 가져옵니다.
  const getFileType = type => type.substring(type.indexOf('/') + 1, type.length);
  // S3 에 보낼 param 객체를 만듭니다.
  const param = {
    Bucket: BUCKET,
    Key: `${BUCKET_PATH}/${Date.now()}-${getFileName(file.name)}.${getFileType(file.type)}`,
    ACL: PUBLIC_READ,
    Body: fs.createReadStream(file.path)
  }
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    if(isImage(file.type) != 'image') reject({ message: 'only image please' });
    s3.upload(param, (err, data) => {
      if(err) reject(err);
      resolve(data.Location);
    });
  });
}
// S3의 저장 경로를 DB에 저장합니다
exports.saveFileLocationToDB = (_id, location) => {
  return MongoClient.connect(dbUrl)
  .then(
    db => db.collection('users')
    .updateOne({ _id: new ObjectID(_id) }, { $set: { image: location } })
  )
  .catch(err => new Error({ message: 'database error'}))
}