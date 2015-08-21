var React = require('react');
var AdvertView = require('./AdvertView.jsx');

var Router = require('react-router');
var Link = Router.Link;

var UserProfileContainer = React.createClass({

	mixins: [Router.State, Router.Navigation],

	getInitialState: function() {
		return {
			userSolvedQuestions: [],
			username: null,
    	user: {}
		}
	},

  componentDidMount: function() {
  	if (this.props.params.username === undefined) {
  		this.transitionTo('getUser', {username: this.props.user.username});
  		//this.getUserData(this.props.user.username);
	  	console.log("PROPS! ", this.props);
  	}
  },

	// This stuff might not work exactly right.
	// TODO: Potentially remove this stuff! HEYO.
  componentDidUpdate: function() {
		var username = this.props.params.username;

		if (username !== this.state.username) {
			this.setState({username: username}, function() {
				this.getUserData(this.props.params.username);
			});
		}
  },

  getUserData: function(username) {
  	if (username != undefined) {
	    $.ajax({
	      url: window.location.origin + '/user?username=' + username,
	      method: 'GET',
	      dataType: 'json',
	      success: function(data){
	      	// console.log("AJAX: ", data.userInfo);
	      	this.setState({
	      		username: data.userInfo.username,
	      		user: data.userInfo
	      	}, function () {
	      		console.log("AJAX RESPONSE: ", this.state.user);
	      	})
	      }.bind(this),
	      error: function(xhr, status, err){
	        console.error(xhr, status, err.message);
	      }
	    });
  	}
  },

	loadUserSolvedQuestions: function() {
		var userID = {userID: this.props.user._id};
		console.log("loadUserSolvedQuestions ajax: ", this.props.user);

		$.ajax({
			url: window.location.origin + '/userProfile',
			method: 'GET',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(userID),
			success: function(data) {
				console.log("loadUserSolvedQuestions ajax success: ", data);
				this.setState({userSolvedQuestions: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log("loadUserSolvedQuestions ajax error: ", error);
			}
		});
	},

	componentDidMount: function() {
		this.loadUserSolvedQuestions();
	},

	render: function() {
		return (
			<div>
				<UserInfo user={this.props.user} />
				<UserSolved solvedQuestions={this.state.userSolvedQuestions} />
				<AdvertView />
			</div>
		);
	}
});

var UserInfo = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-1">
					<img className="img-responsive" src={this.props.user.image} />
				</div>
				<div className="col-md-1">
					<h2>Username: {this.props.user.username}</h2>
					<p> Name: {this.props.user.name}</p>
					<p>{this.props.user._id}</p>
				</div>
			</div>
			
		);
	}
});


var UserSolved = React.createClass({
	render: function() {
		var questionNodes = this.props.solvedQuestions.map(function(solved) {
			return (
			<tr>
	          <td><b>{solved.questionTitle}</b></td>
	          <td><p>{solved.answer}</p></td>
	        </tr>
	      	)
		});
	    return (
	      <div>
	        <table className="questionContainer table table-hover">
	          <tbody>
	          	<tr><th>Solved Question</th><th>Answers</th></tr>
	            {questionNodes}
	          </tbody>
	        </table>
	      </div>
	    );
	}
});

module.exports = UserProfileContainer;