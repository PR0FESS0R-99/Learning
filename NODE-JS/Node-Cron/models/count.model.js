const mongoose = require('mongoose');

const countModel = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('counts', countModel);
