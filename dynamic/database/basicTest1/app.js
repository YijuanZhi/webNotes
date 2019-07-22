const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", {
  useNewUrlParser: true
});

let catSchema = mongoose.Schema({
  name: String,
  age: Number,
  male: Boolean
});

let Cat = mongoose.model("Cat", catSchema);

let zac = new Cat({
  name: "YourBoiZac",
  age: 24,
  male: true
});

zac.save((err, cat) => {
  if (err) {
    console.log("Something went wrong.");
  } else {
    console.log("You just add a cat to db:");
    console.log(cat);
  }
});
