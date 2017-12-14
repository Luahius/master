const User = require('../model/User'); // User model import 합니다

exports.setImage = ((req, res) => {
  const deleteImgFromS3 = data => User.deleteImgFromS3(data.image);
  const parseImage = () => User.parseImage(req);
  const uploadImgToS3 = file => User.uploadImgToS3(file.image);
  const saveFileLocationToDB = location => User.saveFileLocationToDB(req.decoded._id, location);
  const respond = () => res.json({ message: 'Your profile image has been changed' });
  const onError = error => res.status(409).json({ message: error.message });

  User.findOneByEmail(req.decoded.email)
  .then(deleteImgFromS3)
  .then(parseImage)
  .then(uploadImgToS3)
  .then(saveFileLocationToDB)
  .then(respond)
  .catch(onError);
});