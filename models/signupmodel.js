var mongoose = require('mongoose');
  
var signUp = new mongoose.Schema({
    name: String,
    uname: String,
    email: String,
    pass: String,
    followings: Number,
    follwers: Number,
    comments: Number,
    posts: Number
}); 
module.exports = new mongoose.model('signup', signUp);