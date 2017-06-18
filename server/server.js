const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');
const {generateMessage, generateLocationMessage} = require('./util/message');
const {isRealString} = require('./util/validation.js');
const {Users} = require('./util/Users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));

const server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
  console.log('New User Connected');
  socket.on('createMessage', (messageData, callback) => {
    console.log('New Message Created', messageData);
    callback();
    var user = users.getUser(socket.id);
    if(user && isRealString(messageData.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, messageData.text));
    }
  });

  socket.on('createLocationMessage', (messageData) => {
    console.log('New Location Message Created', messageData);
    var user = users.getUser(socket.id);
    if(user)  {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, messageData.latitude, messageData.longitude));
    }
  });

  socket.on('join', (messageData, callback) => {
    if(!isRealString(messageData.name) || !isRealString(messageData.room)){
      callback('Name and Room is Required.');
    }

    socket.join(messageData.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, messageData.name, messageData.room);

    io.to(messageData.room).emit('updateUserList', users.getUserList(messageData.room));

    // io.emit() -> io.to('The Office Fans').emit()
    // socket.broadcast.emit() -> io.broadcast.to('The Office Fans').emit()
    // socket.emit()

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(messageData.room).emit('newMessage', generateMessage('Admin', `${messageData.name} has Joined.`));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');

    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.id).emit('updateUserList', users.getUserList(user.room));
      io.to(user.id).emit('newMessage', generateMessage('Admin', `${user.name} has left the group.`));
    }
  });
});



server.listen(port, () => {
  console.log('Server is up on port 3000');
});
