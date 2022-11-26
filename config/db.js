const mongoose = require("mongoose");
const config = require("config");
const dbUrl = config.get("dbConnString");
const dbHandle = async () => {
  try {
    // Trying a connection to db
    await mongoose.connect(dbUrl);
    console.log("Server Successfully Conected...");
  } catch (error) {
    // respond to errors incase.
    console.log("sorry There existes an error in the server connnection.");
  }
};
module.exports = {
  dbHandle,
};
