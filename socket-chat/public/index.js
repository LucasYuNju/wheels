$(function() {
  const socket = io('/messageCenter');

  // register
  if (location.hash === undefined) {
    alert('Username is required.');
  }
  const name = location.hash.substring(1);
  socket.emit('register', { name });

  // get user list
  socket.emit('users');
  socket.on('users', users => {
    $('select').empty();
    users.forEach(user => {
      $('select').append(`<option>${user.name}</option>`);
    });
  });

  // handle message
  socket.on('message', message => {
    const text = `${message.sender}: ${message.content}`;
    $('ul').append(`<li>${text}</li>`);
  });
  $('#message-form').on('submit', e => {
    console.log("submit");
    e.preventDefault();
    const receiver = $('select').val();
    const content = $('input[type=text]').val();
    socket.emit('message', { receiver, content });
    $('input[type=text]').val('');
  });

});
