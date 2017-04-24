var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var mongo = require('mongodb');
var io = require('socket.io')(server);

var socket = require('socket.io');
var port = 8080;

server.listen(port);
var connections = [];


console.log('Socket server is running on port', port);

app.use(express.static('public')); //host public directory



io.on('connection', newConnection);  //event for new connection (hey im connected, i see you, goodbye)

function newConnection(socket) {
	var conLen = connections.length;
	console.log('new connection: ' + socket.id);
	socket.emit('open', {hello:'world'});
	connections.push(socket);

	io.sockets.emit('getConnection', {connectionLength: conLen});

	console.log("the current connections are:" + connections.length);;

	socket.on('theMouseWasPressed', handleMousePress);
	broadcast(conLen);

}

function confirmData(data) {
	console.log(data);
}

function handleMousePress(data) {
	console.log(data);
}


function broadcast (data) {
	for (item in connections) {
		connections[item].send(data);
	}
}


