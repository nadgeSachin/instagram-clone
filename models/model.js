var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    like:Number,
    posttime:Date,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
module.exports = new mongoose.model('post', imageSchema);