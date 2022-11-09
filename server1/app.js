const express = require("express");
const path=require("path");
const app = express();
app.use(express.json()); 
const body_parser=require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const uri ="mongodb+srv://nadgeSachin:1234567890@cluster0.mtl7iyk.mongodb.net/?retryWrites=true&w=majority";
app.use(express.urlencoded({ extended: true })); 
app.use(body_parser.urlencoded({ extended: true }));
app.use('/static', express.static("public"));

app.use(express.static('public'));

app.use('/images', express.static('images'));
// app.use(express.static(path.join(__dirname, '')));

// app.use(express.static(path.join(__dirname+'/../images/')));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static('images'));

app.get("/", (req, res) => {
	res.set({'Access-control-Allow-Origin': '*'});
    res.sendFile(path.join(__dirname+"/../frontend/home.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname+"/../frontend/login.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname+"/../frontend/reg.html"));
});

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
                    client.close();
                    res.sendFile(path.join(__dirname+"/../frontend/home.html"));
                    console.log("Email And Pass Sahi he");
                } else {
                    client.close();
                    console.log("Email sahi he lekin Pass wrong he");
                    res.json({msg:`no`});
					res.sendFile(path.join(__dirname+"/../frontend/reg.html"));
                }
            });
        }
        if(l){
            client.close();
            res.sendFile(path.join(__dirname+"/../frontend/login.html"));
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
         await collection.insertOne({name:name,username:uname,email:email,password:pass});
         client.close();
         console.log("Data Save");
         res.sendFile(path.join(__dirname+"/../frontend/reg.html"));
       });
       }
   connection1();
});
const PORT = process.env.PORT || 8000; 
app.listen(PORT, console.log(`Server started on port ${PORT}`));














// var express=require("express");
// var bodyParser=require("body-parser");

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/instagram');
// var db=mongoose.connection;
// db.on('error', console.log.bind(console, "connection error"));
// db.once('open', function(callback){
// 	console.log("connection succeeded");
// })
// var app=express()

// app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));
// app.use('/images', express.static('images'));

// app.post('/sign_up', function(req,res){
// 	var email =req.body.email;
//     var name =req.body.name;
//     var uname = req.body.uname;
// 	var pass = req.body.pass;

// 	var data = {
// 		"name": name,
// 		"uname":uname,
// 		"email":email,
// 		"pass":pass
// 	}
// db.collection('signup').insertOne(data,function(err, collection){
// 		if (err) throw err;
// 		console.log("Record inserted Successfully");
			
// 	});
//     res.sendFile("/Users/sachin/Desktop/Instagram/frontend/reg.html");
//     // res.sendFile(__dirname+"/frontend/reg.html");
// })


// app.get('/',function(req,res){
// res.set({'Access-control-Allow-Origin': '*'});
// // res.send("Hello Pat");
// res.sendFile("/Users/sachin/Desktop/Instagram/frontend/login.html");
// // res.sendFile(__dirname+"../frontend/login.html");
// }).listen(3000)


// console.log("server listening at port 3000");
