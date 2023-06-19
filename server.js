const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash=require('connect-flash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
//Step1 For File Upload
const multer = require('multer');
//define middleware
const userauth = require('./Middleware/userAuth');
app.use(userauth.authJwt);

const session = require('express-session');
app.use(session({
    secret:'Sohini',
    //cookie:{maxAge:600000},
    saveUninitialized:true,
    resave:true
}));

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());
app.use(express.static(path.join(__dirname,"public")));

//Step2 For File Upload
app.use('/admin/upload', express.static(path.join(__dirname,'upload')));

app.use('/upload', express.static(path.join(__dirname,'upload')));

//Step3 For Upload
const FileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

//Step 4 For File Type
const FileFilter = (req, file, cb) => {
    if (file.mimetype.includes("png") ||
        file.mimetype.includes("jpg") ||
        file.mimetype.includes("jpeg")) {
        cb(null, true)
    }
    else{
        cb(null,false)
    }
}

//Step 5 For File Upload
app.use(multer({storage: FileStorage, FileFilter: FileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))
app.set("view engine", "ejs");
app.set("views", "views");

//connect mongodb
const dbcon = "mongodb+srv://nodejs_product:WVTErgDGlq4MLRWz@cluster0.eibe8bo.mongodb.net/company"
const port = process.env.PORT || 6001

//define route
const homeRoute = require('./Route/web');
app.use(homeRoute);
const authRoute = require('./Route/auth');
app.use(authRoute);

//define Admin Route
const adminRoute = require('./Route/Admin/web');
app.use('/admin',adminRoute);

const authadminRoute = require('./Route/Admin/auth');
app.use('/admin',authadminRoute);

mongoose.connect(dbcon, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port, () => {
            console.log(`Server is Running Port at http://localhost:${port}`);
            console.log(`Database Connection Successfully`);
        })
    }).catch(error => {
        console.log(error);
    })