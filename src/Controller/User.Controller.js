const { validationResult } = require("express-validator");
const userSchema = require("../Model/User.Model");
const bcryptjs = require("bcryptjs");
const config = require("config");
const { hashPassword, tokenGen } = require("../Utils/UtilityHelpers");

const addUser = async (req, res) => {
  try {
    const err = validationResult(req).errors;
    if (validationResult(req).errors.length === 0) {
      const { email, password, firstName, lastName, confirmPassword } =
        req.body;
      // check to make sure password and confirm password are the same.
      if (password !== confirmPassword) {
        return res.status(201).json({
          status: "Error",
          msg: {
            info: "Sorry There exists an error in your password creation. ",
          },
        });
      }

      const userExists = await userSchema.find({ email: email });
      // check if userArray has elements?
      if (!userExists.length == 0) {
        return res.status(201).json({
          status: "Error",
          msg: {
            info: "Sorry There exists an error. Already this email exists in the System.",
          },
        });
      }
      const hashPass = await hashPassword(password);
      const newUser = new userSchema();
      newUser.email = email;
      newUser.password = hashPass;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      console.log(`CurUuerid :: ${newUser.id}`);
      const token = tokenGen(newUser.id, email, firstName, lastName);
      if (token) {
        await newUser.save();
        return res.status(200).json({
          status: "Success",
          msg: { info: "Everything okay", data: newUser, token },
        });
      } else {
        return res.status(500).json({
          status: "Error",
          msg: {
            info: "Sorry There exists an error during token generation. Already this email exists in the System.",
          },
        });
      }
    } else {
      return res.status(201).json({
        status: "Error",
        msg: { info: "Sorry There exists an error in the System.", data: err },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
};
const getUser = async (req, res) => {
  try {
    const curId = req.params.id;
    const findUser = await userSchema.findById(curId);
    console.log(findUser);
    if (findUser === null) {
      return res.status(201).json({
        status: "Error",
        msg: { info: "Sorry No Such user in the System with this Id" },
      });
    }
    const userData = {};
    userData.email = findUser.email;
    userData.firstName = findUser.firstName;
    userData.lastName = findUser.lastName;
    return res.status(200).json({
      status: "Success",
      msg: { data: userData },
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await userSchema.find(
      {},
      {
        password: 0,
      }
    );
    // console.log(users);
    return res.status(200).json({
      status: "Success",
      msg: { data: users },
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
};
const modifyUser = async (req, res) => {
  try {
    const curId = req.params.id;
    const findUser = await userSchema.findByIdAndUpdate(curId);
    if (findUser === null) {
      return res.status(201).json({
        status: "Error",
        msg: { info: "Sorry No Such user in the System with this Id" },
      });
    }
    //, password, firstName, lastName)
    if (req.body.email) {
      findUser.email = req.body.email;
    }
    if (req.body.firstName) {
      findUser.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      findUser.lastName = req.body.lastName;
    }
    await findUser.save();
    return res.status(200).json({
      status: "Success",
      msg: { data: findUser },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const curId = req.params.id;
    const findUser = await userSchema.findByIdAndDelete(curId);
    if (findUser === null) {
      return res.status(201).json({
        status: "Error",
        msg: { info: "Sorry No Such user in the System with this Id" },
      });
    }
    return res.status(200).json({
      status: "Success",
      msg: { data: findUser },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
};

module.exports = {
  getUser,
  getUsers,
  addUser,
  modifyUser,
  deleteUser,
};

