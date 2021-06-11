const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    test_id: {
        type: Number,
        required: True
    },
    Q_id: {
        type: Number,
        required: True
    },
    answer: {
        type: Number,
        required: True
    }
})
const Answer = mongoose.model('Answer',AnswerSchema);

module.exports = Answer;