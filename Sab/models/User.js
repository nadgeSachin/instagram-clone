const mongoose=require("mongoose")
const Schema=mongoose.Schema
const userSchema =new Schema({
    name:{
        type:String
    },
    uname:{
        type:String
    },
    email:{
        type:String
    },
    pass:{
        type:String
    }
},{timestamps:true})
module.exports =User= new mongoose.model('signup', signUp);