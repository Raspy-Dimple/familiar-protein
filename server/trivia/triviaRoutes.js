var unirest = require('unirest');

module.exports = function (app) {
  app.get('/trivia', function(req, res, next) {
    // get the data for the question of the day
    unirest.get("https://numbersapi.p.mashape.com/7/21/date?fragment=true&json=true")
      .header("X-Mashape-Key", "NAQxXsGQ0zmsh3cHmyYPreFMlBqap1FoPWZjsnkIZym8x6lhDd")
      .header("Accept", "text/plain")
      .end(function (result) {
        // read the information from test.html
        res.json({
          content: result.body.text,
          year: result.body.year,
          sponsor: 'Hack Reactor'
        })
        console.log(result.body);
      });
  });
};