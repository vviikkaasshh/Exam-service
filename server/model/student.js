const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var student = new Schema({
    email: String,
    password: String
});
var student = mongoose.model('student',student);

module.exports= student;