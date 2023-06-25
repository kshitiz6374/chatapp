//This file contains NodeServer which handles Socket.Io connections

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

  const users ={};

io.on('connection',socket=>{
    //Other Users get Notified When A new user Arrives on App
    socket.on('new-user-joined',names=>{
        users[socket.id] =names;
        socket.broadcast.emit('user-joined', names);
    });
    
    //When A user sends A message Every Other user on the App receives it
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, names:users[socket.id]})
    });
    //When A User leaves the chat ,all other users get notified.
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})