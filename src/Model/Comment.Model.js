const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  dislikes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  commentDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("comments", Schema);
