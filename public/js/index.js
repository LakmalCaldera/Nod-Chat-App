var socket = io();

socket.on('connect', function(){
  console.log('Connected to Server');

  socket.emit('createMessage', {
    from: 'Lakmal Caldera',
    text: 'Hello World'
  });


});

socket.on('disconnect', function(){
  console.log('Disconnected to Server');
});

socket.on('newMessage', function(data){
  console.log('New Message');
  logger(data);
});

function logger(messageData){
  console.log('---------------');
  for (var key in messageData) {
    if (messageData.hasOwnProperty(key)) {
      console.log(key, ':', messageData[key]);
    }
  }
  console.log('---------------');
}
