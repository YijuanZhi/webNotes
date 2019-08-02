let mongoose = require("mongoose");
let photoSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
let Photo = mongoose.model("photo_camps", photoSchema);
module.exports = Photo;
