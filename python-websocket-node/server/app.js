const Koa = require('koa');
const app = new Koa();


var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
io.on('connection', function(client){
  client.on('event', function(data){
    console.log('data event')
  });
  client.on('disconnect', function(){
    console.log('disconnect')
  });
});
server.listen(3000);
