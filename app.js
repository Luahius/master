const app = require('./app.config');
//router
app.use('/', require('./router/router'));
//listen
app.listen(app.get('port'), () => console.log(`Server ${app.get('port')} port has been started`));