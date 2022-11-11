const express = require("express");
const path=require("path");
var fs = require('fs');
const app = express();
app.use(express.json()); 

const signupmodel = require('./models/signupmodel');
const loginmodel = require('./models/loginmodel');
const mongoose = require('mongoose');
const body_parser=require("body-parser");
const helmet = require("helmet");


const cookieParser = require('cookie-parser');
app.use(cookieParser());
 

app.use(helmet());

mongoose.connect("mongodb+srv://nadgeSachin:1234567890@cluster0.mtl7iyk.mongodb.net/instadb",
{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("database connected"))
.catch((err)=>console.log(err,"error comes"));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); 
app.use(body_parser.urlencoded({ extended: true }));
app.use('/static', express.static("public"));

var multer = require('multer');
const likefollowmodel = require("./models/likefollowmodel");

  
var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var imageSchema = new mongoose.Schema({
    username: String,
    desc: String,
    likes:Number,
    posttime:Date,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

var imgModel = new mongoose.model('post', imageSchema);
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



//Login
app.get("/login", (req, res) => {
    res.render("reg",{msg:""});
});


app.post("/login", (req, res) => {

    console.log(req.session);
    signupmodel.findOne({email:req.body.email,pass:req.body.pass }, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            if(docs){
            console.log(docs.uname);
            var obj = {
                uname:docs.uname,
                email: req.body.email,
                pass: req.body.pass
            }

            loginmodel.create(obj, (err, item) => {
                if (err) {console.log(err);}
            });
            req.app.locals.cats = docs.uname;
            imgModel.find({}, (err, items) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('An error occurred', err); 
                }
                else {
                    res.render('home', { items: items });
                }
            });
        }else{
            res.render('reg', { msg: "Something is Wrong.."});
        }
        }
    });
});



  //Create Post
  app.get('/createpost', (req, res) => {    
    res.render('createPost');       
});

app.post('/createpost', upload.single('image'), (req, res, next) => {

    loginmodel.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            if(docs){
            var obj = {
                username: docs[0].uname,
                desc: req.body.desc,
                likes:1,
                posttime:2022-10-10,
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
                    res.redirect('/');
                }
            });
              
        }
    }
})
})



  //SignUp
  app.get("/signup", (req, res) => {
    res.render("login");
});

app.post('/signup', upload.single('image'), (req, res, next) => { 
    var obj = {
        name: req.body.name,
        uname: req.body.uname,
        email: req.body.email,
        pass: req.body.pass,
        followings: 0,
        follwers: 0,
        comments: 0,
        posts: 0
    }
    signupmodel.create(obj, (err, item) => {
        if (err) {console.log(err);}
        else {
            res.redirect("login");
        }
    });
});



app.get("/profile", (req, res) => {
    loginmodel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('profile', { uname: items[0].uname });
        }
    });
    //     console.log(req.app.locals.cats+"in profile");
    // res.render('profile', { uname: req.app.locals.cats});
});

app.get("/like",function(re,res){
    console.log("in get likes..");
})
//Likes Updata

app.get('/like', function(req, res) {
    console.log("in likes..");

    loginmodel.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            if(docs){
                // const query = { username: docs[0].uname};
                // const update = { $set: { name:2}};
                // const options = {};
                // collection.updateOne(query, update, options);
                // console.log(req.app.locals.cats+"in like");

                console.log(docs[0]._id);
                imgModel.updateOne({ username:"pat_error"},{ $set: { "likes": 2 }}, function(err, data) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Data updated!");
                    }
                }); 


                

            }
        }
    })                     
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

app.post("/logout", (req, res) => {  

    if(!req.body.logout0){
        loginmodel.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                req.app.locals.cats = "";
                console.log(req.app.locals.cats+"in logout");
                res.render('reg',{msg:""});
            }
        });
    }
    else if(!req.body.logout1){    
}

});

app.post("/creategrp", (req, res) => {
    res.render("manageGrp");
});

app.get("/comment", (req, res) => {
    res.render("comment");
});

app.get("/invitegrp", (req, res) => {
    res.render("inviteGroup");
});


const PORT = process.env.PORT || 8000; 
app.listen(PORT, console.log(`Server started on port ${PORT}`));

















