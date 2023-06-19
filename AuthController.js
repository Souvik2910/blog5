const UserModel =require('../Model/UserModel');
const TokenModel = require ('../Model/TokenModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const flash=require('connect-flash')
const path=require('path')


//For Sign-up
exports.signup = (req, res) => {
    //res.json(req.body)
    UserModel({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    }).save((error,user) => {
        if (!error) {
            // console.log("User Register Successfully",user);
            req.flash("message", "User Register  Successfully...");
            res.redirect("/register");
        } else {
            // console.log("User Not Added",error);
             req.flash("error", "User not register");
             res.redirect("/register");
        }
    })
}

//For Log_In
exports.signin = (req,res) => {
    UserModel.findOne({
        email: req.body.email
    }, (error, data) => {
        if (data) {
            const hashPassword = data.password;
            if (bcrypt.compareSync(req.body.password, hashPassword))
             {
                const token = jwt.sign({
                    id: data._id,
                    name: data.name
                }, "Sohini", { expiresIn: '10m' });
                res.cookie("TokenModel", token);
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data);
                res.redirect("/blog");
            } else {
                // console.log("Invalid Password...");
                req.flash("message", "Invalid Password");
                res.redirect("/login");
            }
        } else {
            // console.log("Invalid Email...");
            req.flash("message", "Invalid Email");
            res.redirect("/login");
        }
    })
}