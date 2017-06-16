const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));

const server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.on('createMessage', (messageData) => {
    console.log('New Message Created');

    socket.emit('newMessage', {
      from: messageData.from,
      text: messageData.text,
      createdAt: moment()
    });
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});



server.listen(port, () => {
  console.log('Server is up on port 3000');
});
