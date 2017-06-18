var socket = io();

function scrollToBottom(){
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  console.log('Connected to Server');
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href= "/";
    }else{

    }
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected to Server');
});

socket.on('newMessage', function(data){
  console.log('New Message');
  logger(data);
  // const formattedTime = moment(data.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${data.from} ${formattedTime}: ${data.text}`);
  //
  // jQuery('#messages').append(li);

  const formattedTime = moment(data.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: data.text,
    createdAt: formattedTime,
    from: data.from
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(data){
  console.log('New Location Message');
  logger(data);
  const formattedTime = moment(data.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // var a = jQuery(`<a target="_blank" href="">Location</a>`);
  //
  // li.text(`${data.from} ${formattedTime}:`);
  // a.attr('href', data.url);
  // li.append(a);
  // jQuery('#messages').append(li);

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: data.url,
    createdAt: formattedTime,
    from: data.from
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('updateUserList', (users) => {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not Supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position){
    console.log(`From geo api - ${position.coords.latitude},${position.coords.longitude}`);
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, function(){
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send Location');
  });
});
