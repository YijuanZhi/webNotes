let mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    username: String
  },
  text: String
});
let Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
