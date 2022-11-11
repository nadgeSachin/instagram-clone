var mongoose = require('mongoose');
  
var likefollowmodel = new mongoose.Schema({
    uname:String,
    likes: Number,
    followings: Number,
    follwers: Number,
    comments: Number,
    posttime: Date,
    posts: Number
}); 
module.exports = new mongoose.model('likefollow', likefollowmodel);