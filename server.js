var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var PORT = process.env.PORT || 8080
server.listen(PORT, function(err) {
  if(err)
    console.error(err);
  else
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});



app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})



io.on('connection', function(socket){

  // Initial connection
  console.log('A user connected');

  // When a user sends a message, emit the message to the server
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  // Whenever the server emits 'user joined' display the event in the console
  socket.on('user joined', function (username) {
    console.log(username + ' joined');
  });

  // Whenever the server emits 'user left' display the event in the console
  socket.on('user left', function (user) {
    console.log(user + ' left');
  });

  // When a user exits or refresh the browser, display the event in the console
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});
