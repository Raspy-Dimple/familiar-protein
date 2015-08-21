var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	questionID: String,
	userID: String,
	answer: String
});

var Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
