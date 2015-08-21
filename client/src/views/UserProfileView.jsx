var React = require('react');
var AdvertView = require('./AdvertView.jsx');

var Router = require('react-router');
var Link = Router.Link;

var UserProfileContainer = React.createClass({

	mixins: [Router.State, Router.Navigation],

  getInitialState: function(){
    return {
    	username: null,
    	user: {}
    };
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

	render: function() {
		return (
			<div>
				<UserInfo user={this.state.user} />
				{ /* // <UserSolved user={} question={} />*/ }
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
					<h2>{this.props.user.username}</h2>
					<p>{this.props.user._id}</p>
				</div>
			</div>
			
		);
	}
});

/*
var UserSolved = React.createClass({
	var userSolvedQuestions = this.props.userSolvedQuestions
	render: function() {
		return (

		);
			<div className="row">
				<div className="col-md-2">
					<h1>Test1</h1>
				</div>
				<div className="col-md-2">
					<h1>Test2</h1>
				</div>
			</div>
		)
			<div className="row">
				<div className="col-md-6 text-center">
					<h1>Test1</h1>
				</div>
				<div className="col-md-6 text-center">
					<h1>Test2</h1>
				</div>
			</div>
		)
	}
});
*/

module.exports = UserProfileContainer;
