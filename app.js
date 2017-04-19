var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var socket = require('socket.io');
var port = 8080;

server.listen(port);


console.log('Socket server is running on port', port);

app.use(express.static('public')); //host public directory

// app "routes": /login, /register, etc
// app.get('/page', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

io.on('connection', newConnection);  //event for new connection (hey im connected, i see you, goodbye)

function newConnection(socket) {
	console.log('new connection: ' + socket.id);
	// setInterval( function(){newLine(Math.random(1000), Math.random(1000))}, 10);
  socket.on('mouseDragged', mouseMsg);
	socket.on('mouseDragged', function(data){mouseMsg({mouseDragged: data, id: socket.id});});
}

function mouseMsg(data, d2){
  // socket.broadcast.emit('mouse', data);
  console.log(data);
}

function newLine(newX, newY){
	io.emit('newLine', {x: newX, y: newY})
}

