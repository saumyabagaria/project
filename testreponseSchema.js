const mongoose = require('mongoose');

const TestResponseSchema = new mongoose.Schema({
    test_id: {
        type: Number,
        required: True
    },
    Q_id: {
        type: Number,
        required: True
    },
    username: {
        type: String,
        required: True
    },
    response: {
        type: Number,
        required: False
    }
})
const TestResponse = mongoose.model('Answer',TestResponseSchema);

module.exports = TestResponse;
