const mongoose = require('mongoose');

// ..1 add
const Class = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdDate:{type: Date, default: new Date()}
});

module.exports = mongoose.model('Class', Class);
