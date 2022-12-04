const express = require("express");
const { body } = require("express-validator");
const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  modifyUser,
} = require("../Controller/User.Controller");

const Router = express.Router();

Router.get("/", getUsers);
Router.post(
  "/",
  body(
    "password",
    "Sorry A valid password is required atleast 6 characters long"
  ).isLength({ min: 6 }),
  body("email", "Sorry Please provide a valid email").isEmail(),
  body("firstName", "Sorry Please provide a valid name").not().isEmpty(),
  body("lastName", "Sorry Please provide a valid Last Name").not().isEmpty(),
  addUser
);
Router.get("/:id", getUser);
Router.delete("/:id", deleteUser);
Router.put("/:id", modifyUser);

module.exports = Router;
