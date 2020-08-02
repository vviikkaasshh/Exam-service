const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var admin = new Schema({
    email: String,
    password: String
});
var admin = mongoose.model('admin',admin);

module.exports= admin;