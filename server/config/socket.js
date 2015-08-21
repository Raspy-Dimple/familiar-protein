module.exports = function(socket){
  socket.on('disconnect', function(){
    console.log("disconnect");
  });
  socket.on('joining', function(){
    // emit event to get all the players in the create game
    console.log("joining");
    socket.broadcast.emit('playersJoined');
  });
};