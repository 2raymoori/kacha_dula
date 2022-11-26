const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profiles",
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
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profiles",
      },
    },
  ],
  dislikes: [
    {
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profiles",
      },
    },
  ],
  postDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("comments", Schema);