const express = require('express');
const { getUsers, addUser, getUser, deleteUser, modifyUser } = require('../Controller/User.Controller');

const Router = express.Router();
Router.get('/',getUsers);
Router.post('/',addUser);
Router.get('/:id',getUser);
Router.delete('/:id',deleteUser);
Router.put('/:id',modifyUser);

module.exports = Router;