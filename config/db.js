const mongoose = require("mongoose");
const config = require("config");
const dbUrl = config.get("dbConnString");
// const dbUrl = "mongodb://127.0.0.1:27017/kacha_dula";
const dbHandle = async () => {
  try {
    // Trying a connection to db
    await mongoose.connect(dbUrl);
    console.log("Server Successfully Conected...");
  } catch (error) {
    // respond to errors incase.
    console.log("sorry There existes an error in the server connnection.");
    console.log(error)
  }
};
module.exports = {
  dbHandle,
};
