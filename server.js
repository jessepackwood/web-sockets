var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//   console.log('someone connected');
// });
// nsp.emit('hi', 'everyone!');


io.on('connection', function(socket){

  io.sockets.emit('welcome','A user connected');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(socket){
    io.sockets.emit('disconnect', 'a user disconnected');
  });

  socket.on('is typing', function(data){
   io.sockets.emit('typing', {nickname: data.nickname});
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});