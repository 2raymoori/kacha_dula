const express = require("express");
const PORT = 3001;
const config = require("config");
// GET CONNECTION TO MONGO DB.
const { dbHandle } = require("./config/db");
const authenticate = require("./src/MiddleWare/Auth");
const Router = require("./src/Router/User.Route");
// const userSchema = require("./src/Model/User.Model");

// INIT THE SERVER HANDLE
const app = express();
// INIT THE CONNECTION TO DB.
dbHandle();

app.get('/',[authenticate],(req,res)=>{
  console.log('a request just came in');
  return res.status(200).json({
    status:"Success",
    data:[{msg:"Good so far so good...."}]
  })
});
app.use('/api/user',Router);

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
