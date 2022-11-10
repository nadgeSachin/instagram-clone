var mongoose = require('mongoose');
  
var loginmodel = new mongoose.Schema({
    uname: String,
    email: String,
    pass: String
}); 
module.exports = new mongoose.model('login', loginmodel);