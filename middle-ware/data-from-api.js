const http = require('http');
module.exports = ((req, res, next) => {
  const postData = JSON.stringify(req.body);
  const options = {
    hostname: '52.79.163.239',
    port: 80,
    path: `/api/auth/${req.originalUrl}`,
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
    }
  }
  const apiReq = http.request(options, (response) => {
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      req.body.chunk = chunk;
      next();
    });
  });
  apiReq.write(postData);
  apiReq.end();
});
