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

socket.on('newLocationMessage', function(data){
  console.log('New Location Message');
  logger(data);
  var li = jQuery('<li></li>');
  var a = jQuery(`<a target="_blank" href="">Location</a>`);

  li.text(`${data.from}:`);
  a.attr('href', data.url);
  li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not Supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    console.log(`From geo api - ${position.coords.latitude},${position.coords.longitude}`)
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }, function(){

    });
  }, function(){
    alert('Unable to fetch location');
  });
});
