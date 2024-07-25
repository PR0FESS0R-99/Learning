var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('users', schema);