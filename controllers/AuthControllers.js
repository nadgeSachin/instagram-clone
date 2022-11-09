const User = require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const register=(req,res,next)=>{
    bcrypt.hash(req.body.pass,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }  

        let user=new User({
            name: req.body.name,
            uname: req.body.uname,
            email: req.body.email,
            pass: hashedPass
        })
        user.save().then(user=>{
            res.json({
                message:"User Added Successfully"
            })
        }).catch(err=>{
            res.json({
                message:"An error occured"
            })
        })
    }) 
}

module.exports={
    register
}