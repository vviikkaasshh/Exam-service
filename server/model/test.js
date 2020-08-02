const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var test = new Schema({
    quesno: Number,
    question: String,
    options: [{ answer: String }, { answer: String }, { answer: String }, { answer: String }],
    selected: Number,
    correct: Number,
    correctflag:Boolean
});
var test = mongoose.model('test', test);

module.exports = test;