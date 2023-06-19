const express = require('express')
const flash=require('connect-flash');

const TeamModel = require('../Model/TeamModel');

// Page Rendering Start
exports.index = (req, res) => {
    res.render('index', {
        title: "Home Page"
    })
}

exports.isUserCheck = (req,res,next) => {
    if(req.cookies && req.cookies.TokenModel){
        next()
    }else{
        res.redirect('/login')
    }
}

exports.about = (req, res) => {
    TeamModel.find((err, data) => {
        if (!err) {
            res.render('about', {
                title: "About Page",
                displaydata: data,
                message:req.flash('message')
            })
            console.log(data);
        } else {
            console.log("Data Not Found");
        }
    })
    // res.render('about', {
    //     title: "About Page"
    // })
}

exports.services = (req, res) => {
    res.render('services', {
        title: "services page"
    })
}

exports.register = (req, res) => {
    //rememberme
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('register', {
        title: "Register page",
        message: req.flash('message'),
        data: loginData
    })
}

exports.login = (req, res) => {
    res.render('login', {
        title: "Login page",
        message: req.flash('message')
    })
}

exports.blog = (req, res) => {
    res.render('blog', {
        title: "Blog Page",
        message: req.flash('message')
    })
}

exports.contact = (req, res) => {
    res.render('contact', {
        title: "Contact Page"
    })
}

exports.team = (req, res) => {
    TeamModel.find((err, data) => {
        if (!err) {
            res.render('team', {
                title: "Team Page",
                displaydata: data,
                message:req.flash('message')
            })
            console.log(data);
        } else {
            console.log("Data Not Found");
        }
    })
    // res.render('team', {
    //     title: "team page"
    // })
}

exports.testimonials = (req, res) => {
    res.render('testimonials', {
        title: "testimonials page"
    })
}

exports.logout=(req,res)=>{
    res.clearCookie('TokenModel')
    res.redirect('/')
}
