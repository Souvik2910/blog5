const express = require('express');

const Home_Route=express.Router()
const HomeController = require('../Controller/HomeController');


//Pages Link
Home_Route.get('/',HomeController.index);
Home_Route.get('/about',HomeController.about);
Home_Route.get('/services',HomeController.services);
Home_Route.get('/register',HomeController.register);
Home_Route.get('/login',HomeController.login);
Home_Route.get('/logout',HomeController.logout);
Home_Route.get('/blog', HomeController.isUserCheck,HomeController.blog);
Home_Route.get('/contact',HomeController.contact);
Home_Route.get('/team',HomeController.team);
Home_Route.get('/testimonials',HomeController.testimonials);

module.exports=Home_Route;