const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(proxy('/api/v1', { target: 'http://localhost:3000'}));
    app.use(proxy('/*', { target: 'http://localhost:8080'}));
    
   
}
