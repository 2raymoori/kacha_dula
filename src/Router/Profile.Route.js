const express = require('express');
const { allProfile, profile, addProfile, modifyProfile, deleteProfile } = require('../Controller/Profile.Controller');
const authenticate = require('../MiddleWare/Auth');
const Router = express.Router();
Router.get('/',allProfile);
Router.get('/:id',profile);
Router.post('/',[authenticate],addProfile);//[authenticate]
Router.put('/:id',modifyProfile);
Router.delete('/:id',deleteProfile);
module.exports = Router;