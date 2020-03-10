const { io } = require('../bin/www');

exports.processMatch = async function processMatch(subscription, signaledTopic) {
  opts = {
    from: 'Simple Notification Service',
    to: subscription.username,
    subject: signaledTopic,
    body: `${subscription.topic} topic has new changes happened at: ${new Date()}`
  }
  // Send alert
  console.log('Alert sent to subscripers!! ==>', opts)
  // const socket = await getSocket();
  // socket.join(subscription.username, () => {
  //   const rooms = Object.keys(socket.rooms);
  //   console.log(rooms);
    io.to(subscription.username).emit('newChange', opts);
  // });
}

io.on('connection', socket => {
  // console.log(socket);
  socket.on('username', user => {
    console.log(user);
    socket.join(user.username, () => {
      const rooms = Object.keys(socket.rooms);
      console.log(`${user.username} join room name ${user.username}`, rooms);
    });

    socket.on('disconnect', () => {
      socket.leave(user.username, () => {
        const rooms = Object.keys(socket.rooms);
        console.log(`${user.username} left room name ${user.username}`, rooms);
      });
    });
  });
});


