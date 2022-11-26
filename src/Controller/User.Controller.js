const userSchema = require('../Model/User.Model');

const addUser = (req,res)=>{
    console.log("Route for adding User...")
    
}
const getUser = (req,res)=>{
    console.log("Route for fetching a User...")
    
}
const getUsers = (req,res)=>{
    console.log("Route for  fetching all User...")
    
}
const modifyUser = (req,res)=>{
    console.log("Route for  modifying a User...")
    
}
const deleteUser = (req,res)=>{
    console.log("Route for  deleting a User...")
    
}

module.exports = {
    getUser,
    getUsers,
    addUser,
    modifyUser,
    deleteUser
}