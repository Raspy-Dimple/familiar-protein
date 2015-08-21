var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var AdvertView = React.createClass({
  
  getInitialState: function() {
    return {
      content: '',
      year: '',
      sponsor: '',
      showAnswer: false
    }
  },

  loadTriviaQuestion: function() {
    $.ajax({
      url: window.location.origin + '/trivia',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        this.setState({content: data.content, year: data.year, sponsor: data.sponsor});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    })
  },

  handleShow: function() {
    this.setState({showAnswer: true});
  },

  componentDidMount: function() {
    this.loadTriviaQuestion();
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'advert-steez': true,
      'row':true,
      'hide-advert': true,
      'show-advert': this.state.showAnswer
    });

    var otherClasses = cx({
      'advert-steez': true,
      'row':true,
      'hide-advert': true,
      'show-advert': (!this.state.showAnswer)
    })

    return (
      <div className="advert" onClick={this.handleShow}>
        <ReactCSSTransitionGroup transitionName="example">
          <div className={otherClasses}>
            <h1 className="text-center">What happened on this day in {this.state.year}?</h1>
          </div>
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup transitionName="example">
          <div className={classes}>
           
            <blockquote className="col-md-4 col-md-offset-2">
              <p>{this.state.content}</p>
            </blockquote>
            <div className="col-md-6">
              <img src="http://equineink.files.wordpress.com/2014/04/exploding-soda.gif" />
              <div className="test">brought to you by {this.state.sponsor}</div>
            </div>
          </div>
        </ReactCSSTransitionGroup>        
      </div>
    )
  }

});


module.exports = AdvertView;