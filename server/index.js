var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('Someone connected to us');
});

server.listen(3001, function(){
  console.log('listening on *:3001  ');
});