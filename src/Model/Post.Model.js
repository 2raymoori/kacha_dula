const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profiles",
  },
  title: {
    type: String,
    required: true,
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
module.exports = mongoose.model("posts", postSchema);
