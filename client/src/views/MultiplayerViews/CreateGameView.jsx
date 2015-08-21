var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var CreateGameView = React.createClass({
  
  mixins: [Navigation, Router.State],

  // componentDidMount: function(){
  //   socket.on('playersJoined', function(){
  //     console.log("players joined in create game");
  //   });
  // },

  createGameID: function () {
    var gameID = '';
    var validChars = 'ABCDEFGHJKLMNOPQRSTUVWXYZ123456789';

    for(var i = 0; i < 6; i++) {
      gameID += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }

    return gameID;
  },

  players: null,

  createGame: function(gameID){
    var game = {id: gameID};
    $.ajax({
      url: window.location.origin + "/makeGame",
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(game),
      success: function(data){
        console.log("Successfully created game", data);
      },
      error: function(xhr, status, err){
        console.log("ERROR in ajax", err);
      }
    });
  },


  startGame: function(){
    console.log("starting game");
    this.transitionTo('question', {qNumber: 1}); // transition to first question
  },

  updatePlayers: function(){
    console.log("updating players");
  },

  render: function(){

    var gameID = this.createGameID();
    this.createGame(gameID);

    return (
      <div>
        <h1>This is the create Game view</h1>
        <h1>Enter Code: {gameID}</h1>
        <button className="btn btn-primary" onClick={this.startGame}>Play</button>
      </div>
    );
  }

});

module.exports = CreateGameView;