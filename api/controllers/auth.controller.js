const User = require('../model/User'); // User model import 합니다

// user register
exports.register = ((req, res) => {
  const { email, pw, name, phone } = req.body;
  const checkInfo = (email, pw, name, phone) => {
    if(!(email && pw && name && phone)) return false;
    else return true;
  }
  const create = (user) => {
    if(user) throw new Error('email exists');
    else return User.create(email, pw, name, phone);
  }
  const respond = () => res.json({ message: 'register has been succeed' });
  const onError = (error) => res.status(409).json({ message: error.message });
  // 사용자의 입력을 체크합니다
  if(checkInfo(email, pw, name, phone)) {
    // email 중복 확인 먼저 합니다
    User.findOneByEmail(email)
    .then(create)
    .then(respond)
    .catch(onError)
  }
  else res.status(404).json({ messsage: 'please input your info' });
});
// user login
exports.login = ((req, res) => {
  const { email, pw } = req.body;
  const verify = (user) => {
    if(!user) throw new Error('user doesn\'t exist');
    else {
      // check password
      if(User.verify(pw, user.pw)) return User.getToken(user); 
      else throw new Error('password invalid');
    }
  }
  const respond = (token) => res.json({ message: 'login has been succeed', token });
  const onError = (error) => res.status(403).json({ message: error.message });
  User.findOneByEmail(email)
  .then(verify)
  .then(respond)
  .catch(onError)
});