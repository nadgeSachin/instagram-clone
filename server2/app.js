const express = require("express");
const path=require("path");
const app = express();
app.use(express.json()); 
// const ejs = require('ejs');

// const hbs = require("hbs");

const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.set('view engine', 'ejs');
// app.set("views", "views");
const mongoose = require('mongoose');

const body_parser=require("body-parser");

const MongoClient = require('mongodb').MongoClient;
const uri ="mongodb+srv://nadgeSachin:1234567890@cluster0.mtl7iyk.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect("mongodb+srv://nadgeSachin:1234567890@cluster0.mtl7iyk.mongodb.net/?retryWrites=true&w=majority",
// {useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("database connected"))
// .catch((err)=>console.log(err,"error comes"));

app.use(express.urlencoded({ extended: true })); 
app.use(body_parser.urlencoded({ extended: true }));
app.use('/static', express.static("public"));

app.get("/", (req, res) => {
	// res.set({'Access-control-Allow-Origin': '*'});
    // res.sendFile(path.join(__dirname+"/../frontend/home.html"));
    // res.render("/views/home");
    //res.render("/views/home.ejs", { /* ... */ });
    // res.sendFile(__dirname+'/views/home.html');
    res.render("home");
});

app.get("/Chats", (req, res) => {
    res.render("Chats");
});


app.get("/manageGrp", (req, res) => {
    res.render("manageGrp");
});

app.get("/notification", (req, res) => {
    res.render("notification");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});


app.get("/createPost", (req, res) => {
    res.render("createPost");
});

app.get("/signup", (req, res) => {
    res.render("login");});


app.get("/login", (req, res) => {
    res.render("reg");});

app.post("/logg", (req, res) => { 
	console.log("pat");  
      function connection1(){
        var login="";
        let l;
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(async(err) => {
          const collection = client.db('instadb').collection('signup');
          await collection.findOne({"email":req.body.email}, function (err, result) {
            if (err) {
                console.log("Error");
            }
            if (result !== null) {
                
                console.log("Email Sahi he");
                 login="yes";
                 let l=1;
            } else {
              
                console.log("Email Wrong he");           
                login="no" 
                let l=0;              
            }
        });


        if(!l){
            await collection.findOne({"password":req.body.pass}, function (er,rs) {
                if (er) {
                    console.log("Error");
                }
                if (rs !== null) {
                    res.render("home");
                    console.log("Email And Pass Sahi he");
                } else {
                    console.log("Email sahi he lekin Pass wrong he");
                    res.json({msg:`no`});
                    res.render("reg");                }
            });
        }
        if(l){
            res.render("login");  
        }
        });
        }
    connection1();
});

app.post("/sign", (req, res) => { 	  
    var email =req.body.email;
    var name =req.body.name;
    var uname = req.body.uname;
	var pass = req.body.pass;
     function connection1(){
       const client = new MongoClient(uri, { useNewUrlParser: true });
       client.connect(async(err) => {
         const collection = client.db('instadb').collection('signup');     
         collection.insertOne({name:name,username:uname,email:email,password:pass});
         console.log("Data Save");
         res.render("reg");
       });
       }
   connection1();
});
const PORT = process.env.PORT || 8000; 
app.listen(PORT, console.log(`Server started on port ${PORT}`));


