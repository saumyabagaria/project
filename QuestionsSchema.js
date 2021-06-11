const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    test_id: {
        type: Number,
        required: True
    },
    Q_id: {
        type: Number,
        required: True
    },
    Q_desc: {
        type: String,
        required: True
    },
    Choice1: {
        type: String,
        required: True
    },
    Choice2: {
        type: String,
        required: True
    },
    Choice3: {
        type: String,
        required: True
    },
    Choice4: {
        type: String,
        required: True
    }
})
const Question = mongoose.model('Question',QuestionSchema);

module.exports = Question;