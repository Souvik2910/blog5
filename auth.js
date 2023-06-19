const express = require('express');
const Auth_Route=express.Router()

const AuthController=require('../Controller/AuthController');
const VerifySignup = require('../Middleware/VerifySignup');

Auth_Route.post("/signup", [VerifySignup.checkDuplicateEntries], AuthController.signup);
Auth_Route.post("/signin",AuthController.signin);

module.exports = Auth_Route;