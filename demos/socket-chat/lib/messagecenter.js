const NAMESPACE = '/messageCenter';

class MessageCenter {
  constructor(io) {
    this.namespace = io.of(NAMESPACE);
    this.users = {};
    this.addPublicRooms();
    this.initSocket();
  }

  addPublicRooms() {
    this.users.room1 = {
      name: 'room1'
    };
  }

  initSocket() {
    this.namespace.on('connection', socket => {
      socket.on('register', data => {
        if (this.users[data.name] === undefined) {
          this.users[data.name] = {
            name: data.name
          }
        }
        socket.join(data.name);
        socket.username = data.name;
        console.log(data.name, "registered");
      });

      socket.on('message', data => {
        const payload = {
          sender: socket.username,
          content: data.content
        };
        this.namespace.to(data.receiver).emit('message', payload);
      });

      socket.on('users', () => {
        const payload = Object
          .keys(this.users)
          .filter(name => name !== socket.username)
          .map(name => {return { name };});
        socket.emit('users', payload);
      });

    });

  }
}

module.exports = MessageCenter;
