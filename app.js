const app = require('./app.config');
// web-router
app.use('/', require('./router/router'));
// api-router
app.use('/api', require('./router/api.router'));
//listen
app.listen(app.get('port'), () => console.log(`Server ${app.get('port')} port has been started`));