var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var NavBarView = React.createClass({
  render: function() {
    console.log("PROPS NAVVIEW: ", this.props);
    if (this.props.loggedIn) {
      // LOGGED IN!
      var profileHTML = <li><Link to="userProfile">Profile</Link></li>

      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="default" className="navbar-brand" href="#">RegExCEPTIONAL</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hello, {this.props.user.username}! <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><Link to="userProfile">Profile</Link></li>
                    <li><a href="#">Stats</a></li>
                    <li><a href="#">Settings</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="/logout">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )

    } else {
      // NOT LOGGED IN!

      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="default" className="navbar-brand" href="#">RegExCEPTIONAL</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="login">Sign Up / Log In</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      )
    }
  }
});



module.exports = NavBarView;
