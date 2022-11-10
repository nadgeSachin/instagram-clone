const express = require("express");
const path=require("path");
var fs = require('fs');
const app = express();
app.use(express.json()); 

const signupmodel = require('./signupmodel');

const mongoose = require('mongoose');
const body_parser=require("body-parser");

// var imgModel = require('./model');


// const MongoClient = require('mongodb').MongoClient;
// const uri ="mongodb+srv://nadgeSachin:1234567890@cluster0.mtl7iyk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect("mongodb+srv://nadgeSachin:1234567890@cluster0.mtl7iyk.mongodb.net/instadb",
{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("database connected"))
.catch((err)=>console.log(err,"error comes"));

app.set('view engine', 'ejs');



app.use(express.urlencoded({ extended: true })); 
app.use(body_parser.urlencoded({ extended: true }));
app.use('/static', express.static("public"));

var multer = require('multer');
const loginmodel = require("./loginmodel");
  
var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

var imgModel = new mongoose.model('posts', imageSchema);
var upload = multer({ storage: Storage });




//Home Page

app.get("/", function(req, res) {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('home', { items: items });
        }
    });
  });


  //Create Post
  app.get('/createpost', (req, res) => {    
    res.render('createPost');       
});

app.post('/createpost', upload.single('image'), (req, res, next) => {
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/createpost');
        }
    });
});



  //SignUp
  app.get("/signup", (req, res) => {
    res.render("login");
});

app.post('/signup', upload.single('image'), (req, res, next) => { 
    var obj = {
        name: req.body.name,
        uname: req.body.uname,
        email: req.body.email,
        pass: req.body.pass
    }
    signupmodel.create(obj, (err, item) => {
        if (err) {console.log(err);}
        else {
            res.redirect("login");
        }
    });
});

//Login
app.get("/login", (req, res) => {
    res.render("reg");
});


app.post("/login", (req, res) => {

   

    signupmodel.findOne({email:req.body.email,pass:req.body.pass }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            var obj = {
                uname:docs.uname,
                email: req.body.email,
                pass: req.body.pass
            }

            loginmodel.create(obj, (err, item) => {
                if (err) {console.log(err);}
            });
            imgModel.find({}, (err, items) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('An error occurred', err);
                }
                else {
                    res.render('home', { items: items });
                }
            });
        }
    });
});


//Profile
app.get("/profile", (req, res) => {
    res.render("profile");
});

app.post("/profile", (req, res) => {
    loginmodel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('profile', { items: items });
        }
    });
});


// app.get("/", (req, res) => {
//     res.render("home");
// });

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


const PORT = process.env.PORT || 8000; 
app.listen(PORT, console.log(`Server started on port ${PORT}`));


