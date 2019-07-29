let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // EMBEDED DATA TYPE!!
  // We embeded a whole postSchema type inside of userSchema
  //   posts: [postSchema]
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});
let User = mongoose.model("User", userSchema);
module.exports() = User;