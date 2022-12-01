const { validationResult } = require('express-validator');
const userSchema = require('../Model/User.Model');
const bcryptjs = require('bcryptjs');
const config = require('config');
const { hashPassword, tokenGen } = require('../Utils/UtilityHelpers');


const addUser = async(req,res)=>{
    try {
        const err = validationResult(req).errors;
    if(validationResult(req).errors.length ===0){
        const {email,password,firstName,lastName,confirmPassword} = req.body;
        // check to make sure password and confirm password are the same. 
       if(password !== confirmPassword){
        return res.status(201).json({
            status:"Error",msg:{"info":"Sorry There exists an error in your password creation. "}
        })
       }

       const userExists =await userSchema.find({"email":email});
       // check if userArray has elements? 
;       if(!userExists.length == 0){
    return res.status(201).json({
        status:"Error",msg:{"info":"Sorry There exists an error. Already this email exists in the System."}
    })
       }
     const hashPass = await hashPassword(password);
       const newUser = new userSchema()
       newUser.email = email;
       newUser.password = hashPass;
       newUser.firstName = firstName;
       newUser.lastName = lastName;
       console.log(`CurUuerid :: ${newUser.id}`);
       const token =  tokenGen(newUser.id,email,firstName,lastName);
       if(token){
                await newUser.save();
        return res.status(200).json({
            status:"Success",msg:{"info":"Everything okay",data:newUser,token}
        })

       }
       else{
        return res.status(500).json({
            status:"Error",msg:{"info":"Sorry There exists an error during token generation. Already this email exists in the System."}
        })
        
       }
    }else{
        return res.status(201).json({
            status:"Error",msg:{"info":"Sorry There exists an error in the System.",data:err}
        })
    }
    console.log("Route for adding User...")
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:"Error",msg:{"info":"Sorry There exittss an error in the server"}})
    }
    
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