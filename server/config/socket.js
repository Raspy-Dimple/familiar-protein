module.exports = function(socket){
  socket.on('disconnect', function(){
    console.log("disconnect");
  });
  socket.on('joining', function(){
    // emit event to get all the players in the create game
    socket.broadcast.emit('playersJoined');
  });
};