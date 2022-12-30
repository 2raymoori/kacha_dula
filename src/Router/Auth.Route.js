const express = require('express');
const {login} = require('../Auth/Login');
const {body} = require('express-validator');

const Router = express.Router();

Router.post('/',[body('password',"Sorry A valid password is required").isLength({min:6}),body('email',"Sorry pelase provide a valid email").isEmail()],login);

module.exports =  Router;