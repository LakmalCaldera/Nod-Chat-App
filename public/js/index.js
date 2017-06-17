var socket = io();

socket.on('connect', function(){
  console.log('Connected to Server');
});

socket.on('disconnect', function(){
  console.log('Disconnected to Server');
});

socket.on('newMessage', function(data){
  console.log('New Message');
  logger(data);
  var li = jQuery('<li></li>');
  li.text(`${data.from}: ${data.text}`);

  jQuery('#messages').append(li);
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

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  });
});
