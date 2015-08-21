var React = require('react/addons');

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
      'hide-advert': true,
      'show-advert': this.state.showAnswer
    });

    return (
      <div className="advert">
        <p onClick={this.handleShow}>What happened on this day in {this.state.year}?</p>
        <div className={classes}>
          <p>{this.state.content}</p>
          <p>brought to you by {this.state.sponsor}</p>
        </div>
      </div>
    )
  }

});


module.exports = AdvertView;