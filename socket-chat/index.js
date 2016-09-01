const MessageCenter = require('./lib/messagecenter');

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080, () => {
  console.log('Server listening at port 8080');
});

app.use(express.static(__dirname + '/public'));

const messageCenter = new MessageCenter(io);
