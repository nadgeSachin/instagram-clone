const express=require("express")
const router=express.Router()
const AuthControlller=require("../controllers/AuthControllers");
router.post("/register",AuthControlller.register)
module.exports=router