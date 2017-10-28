var model = require('./model');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var colors = {};

io.on('connection', function(socket){
  console.log('Someone connected to us');

  socket.on('getMap', function(){
    socket.emit('heresTheMap', {map: model.map});
  });

  switch (Math.floor(Math.random()*3)) {
    case 0:
      colors[socket.id] = 'yellow';
      break;
    case 1:

      colors[socket.id] = 'blue';
      break;
    case 2:

      colors[socket.id] = 'red';
      break;
  }

  socket.on('conquer', function(where){
    var conquerObject = {
      id: socket.id,
      x: where.x,
      y: where.y,
      color: colors[socket.id]
    };
    socket.broadcast.emit('conquered', conquerObject);
    socket.emit('conquered', conquerObject);
    model.map[where.x][where.y] = colors[socket.id];
  });
});

server.listen(3001, function(){
  console.log('listening on *:3001  ');
  console.log('WASSAP MA NIG');
});
