var Answer = require('./answerModel');

var saveAnswer = function(req, res, next) {
	Answer.findOne({questionID: req.body.questionID, answer: req.body.answer})
	.exec(function(err, data) {
		if (err) {
			console.log("FindOne answer error: ", err);
		} else {
			if (data === null) {
				var newAnswer = new Answer(req.body);
				newAnswer.save(function(err, data) {
					if (err) {
						console.log("Save answer error: ", err);
					} else {
						console.log("Add answer success: ", data);
					}
				});
			} else {
				console.log("Same answer same question already exist");
			}
		}
	});
}

module.exports = {
	saveAnswer: saveAnswer
}