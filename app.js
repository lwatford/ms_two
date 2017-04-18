var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var socket = require('socket.io');

server.listen(8080);


console.log('my socket server is running');

app.use(express.static('public')); //host public directory

// i will need to turn this on to hear from other users
// app.get('/newLine', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

io.on('connection', newConnection);  //event for new connection (hey im connected, i see you, goodbye)

function newConnection(socket) {
	console.log('new connection: ' + socket.id);
	// setInterval( function(){newLine(Math.random(1000), Math.random(1000))}, 10);
	socket.on('mouse', mouseMsg);

  function mouseMsg(data){
  socket.broadcast.emit('mouse', data);
  console.log(data);
} //msg going in and going back out

function newLine(newX, newY){
	io.emit('newLine', {x: newX, y: newY})
}

