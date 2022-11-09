const express = require("express");
const mongoose = require('mongoose');
const body_parser=require("body-parser");
const signupmodel = require('./modelOne');
const multer = require('multer');
const path=require("path");
const AuthRoute=require("./routes/auth")

const app = express();
app.use(express.json()); 
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://nadgeSachin:1234567890@cluster0.mtl7iyk.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("database connected"))
.catch((err)=>console.log(err,"error comes"));

app.use(express.urlencoded({ extended: true })); 
app.use(body_parser.urlencoded({ extended: false }));
app.use('/static', express.static("public"));

app.use("/api",AuthRoute);

var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: Storage });



app.get("/", (req, res) => {
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
    res.render("login");
});
app.post('/signup1', upload.single('image'), (req, res, next) => { 
    var obj = {
        name: req.body.name,
        uname: req.body.uname,
        email: req.body.email,
        pass: req.body.pass
    }
    signupmodel.create(obj, (err, item) => {
        if (err) {console.log(err);}
        else {res.redirect('/');}
    });
});

app.get("/login", (req, res) => {
    res.render("reg");});




const PORT = process.env.PORT || 8000; 
app.listen(PORT, console.log(`Server started on port ${PORT}`));


