let port = 3000;
let express = require("express");
let rq = require("request-promise");
let bodyparser = require("body-parser");
let app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Database Setup
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/photo_camp", { useNewUrlParser: true });
let photoSchema = new mongoose.Schema({
  name: String,
  url: String
});
let Photo = mongoose.model("photo_camps", photoSchema);

// Routes(RESTful)=======================================================================
app.get("/", (req, res) => {
  res.render("home");
});

// INDEX
app.get("/items", (req, res) => {
  Photo.find({}, (err, items) => {
    if (err) {
      console.log("Something went wrong:");
      console.log(err);
    } else {
      res.render("items", {
        items: items
      });
    }
  });
});

//CREATE
app.post("/items", (req, res) => {
  let newItem = {
    name: req.body.name,
    url: req.body.url
  };
  Photo.create(newItem, (err, item) => {
    if (err) {
      console.log("Something went wrong: " + err);
    } else {
      console.log("New item successfully added: ");
      console.log(item);
    }
  });
  res.redirect("items");
});

//NEW
app.get("/items/new", (req, res) => {
  res.render("new");
});

//SHOW
app.get("/items/:id", (req, res) => {
  let curId = req.params.id;
  // or i can use findById(req.params.id, .... )
  // the item will an JSON object instead of an array
  Photo.find({ _id: curId }, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(curId);
      console.log(item);
      res.render("show", { item: item[0] });
    }
  });
});

//Server start
app.listen(port, () => {
  console.log("Server has started.");
});
