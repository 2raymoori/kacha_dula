const express = require("express");
const PORT = 3001;
const config = require("config");
// GET CONNECTION TO MONGO DB.
const { dbHandle } = require("./config/db");
// const userSchema = require("./src/Model/User.Model");

// INIT THE SERVER HANDLE
const app = express();
// INIT THE CONNECTION TO DB.
dbHandle();

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
