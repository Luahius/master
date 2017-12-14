const app = require('./app.config');
const auth = require('./api/middle-ware/auth');
// web-router
app.use('/', require('./router/router'));
// api-router
app.use('/api', require('./api/router/api.router'));
//listen
app.listen(app.get('port'), () => console.log(`Server ${app.get('port')} port has been started`));