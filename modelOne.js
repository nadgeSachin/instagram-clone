var mongoose = require('mongoose');
  
var signUp = new mongoose.Schema({
    name: String,
    uname: String,
    email: String,
    pass: String
}); 
module.exports = new mongoose.model('signup', signUp);