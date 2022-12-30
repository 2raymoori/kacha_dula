const { validationResult } = require("express-validator");
const userSchema = require('../Model/User.Model')
const bcryptjs = require('bcryptjs');
const { tokenGen } = require("../Utils/UtilityHelpers");

const login = async(req,res)=>{
    try {
        const err = validationResult(req).errors;
        if (validationResult(req).errors.length === 0) {
          const { email, password} =req.body;
    
          const userExists = await userSchema.find({ email: email });
          // check if userArray has elements?
          if (!userExists.length == 0) {
            const curUser = userExists[0];
            const passwordConfirm = await bcryptjs.compare(password,curUser.password);
            if(passwordConfirm){
                   const token = tokenGen(curUser.id, curUser.email, curUser.firstName, curUser.lastName);
                  if (token) {
                    return res.status(200).json({
                      status: "Success",
                      msg: { info: "LoginSuccess", token:token },
                    });
                  } else {
                    return res.status(500).json({
                      status: "Error",
                      msg: {
                        info: "Sorry There exists an error during token generation. Already this email exists in the System.",
                      },
                    });
                  }
            }
            else{
                return res.status(201).json({
                    status:"Error",
                    msg:{info:"Sorry there exists an issue. A user with this credentials doesn't exists in the System."}
                })

            }
          }
          else{
            return res.status(201).json({
                status:"Error",
                msg:{info:"Sorry there exists an issue. A user with this credentials doesn't exists in the System."}
            })
          }
        
        } else {
          return res.status(201).json({
            status: "Error",
            msg: { info: "Sorry There exists an error in the System.", data: err },
          });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "Error",
          msg: { info: "Sorry There exittss an error in the server" },
        });
        
    }
}

module.exports = {
    login
}