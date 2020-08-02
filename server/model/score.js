const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var score = new Schema({
    email: String,
    name: String,
    score:Number,
    rank:Number
});
var score = mongoose.model('score',score);

module.exports= score;