var answerController = require('./answerController.js');

module.exports = function (app) {
  app.post('/answers/:id', answerController.saveAnswer);
  // get user solved questions to display in user profile
  app.post('/userProfile', answerController.loadSolvedQuestion);
};