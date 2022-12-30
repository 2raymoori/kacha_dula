const express = require("express");
const PORT = 3830;
const config = require("config");
const cors = require("cors");
// const formData = require('express-form-data');
const fileUpload = require("express-fileupload");
// GET CONNECTION TO MONGO DB.
const { dbHandle } = require("./config/db");
const authenticate = require("./src/MiddleWare/Auth");
const UserRouter = require("./src/Router/User.Route");
const ProfileRouter = require('./src/Router/Profile.Route');
const Router = require("./src/Router/Auth.Route");
const postRouter = require('./src/Router/Post.Route')
// const userSchema = require("./src/Model/User.Model");

// INIT THE SERVER HANDLE
const app = express();
app.use(express.json());

app.use(fileUpload({
  // limits:{fileSize:50 * 1024 * 1024},
  createParentPath:true,
}))
app.use(express.static(__dirname+"/ProfileImgs"));
// INIT THE CONNECTION TO DB.
dbHandle();

app.get("/", [authenticate], (req, res) => {
  console.log("a request just came in");
  return res.status(200).json({
    status: "Success",
    data: [{ msg: "Good so far so good...." }],
  });
});
app.use("/api/user", UserRouter);
app.use('/api/profile',ProfileRouter);
app.use('/api/auth',Router);
app.use('/api/post',postRouter);

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
