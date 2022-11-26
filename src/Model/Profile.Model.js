const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  img: {
    type: String,
    default: "defImg",
  },
  gender: {
    type: Integer,
    require: true,
  },
  nationality: {
    type: String,
    require: true,
  },
  status: {
    type: Integer,
  },
  pno: {
    type: String,
  },
  friends: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  ],
});
module.exports = mongoose.model("profiles", Schema);
