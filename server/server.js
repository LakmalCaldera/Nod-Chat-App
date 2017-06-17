const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');
const {generateMessage, generateLocationMessage} = require('./util/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));

const server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

  socket.on('createMessage', (messageData, callback) => {
    console.log('New Message Created', messageData);
    callback('This is an ACK from the server!');
    io.emit('newMessage', generateMessage(messageData.from, messageData.text));
  });

  socket.on('createLocationMessage', (messageData, callback) => {
    console.log('New Location Message Created', messageData);
    callback('This is an ACK from the server!');
    io.emit('newLocationMessage', generateLocationMessage('Admin',messageData.latitude, messageData.longitude));
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});



server.listen(port, () => {
  console.log('Server is up on port 3000');
});
