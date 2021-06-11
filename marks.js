const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
    username: {
        type: String,
        required: True
    },
    score: {
        type: Number,
        required: True
    },
    test_id: {
        type: Number,
        required: True
    }
})
const Mark = mongoose.model('Mark',markSchema);

module.exports = Mark;