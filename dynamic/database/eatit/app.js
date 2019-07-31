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
let Photo = require("./modules/photo.js");
let Comment = require("./modules/comment.js");
// clear the database and reset and database
// let seedDB = require("./seeds");
// seedDB();
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
      res.render("photos/items", {
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
  res.redirect("photos/items");
});

//NEW
app.get("/items/new", (req, res) => {
  res.render("photos/new");
});

//SHOW
app.get("/items/:id", (req, res) => {
  let curId = req.params.id;
  // or i can use findById(req.params.id, .... )
  // the item will an JSON object instead of an array
  Photo.findById({ _id: curId })
    .populate("comments")
    .exec((err, item) => {
      if (err) {
        console.log(err);
      } else {
        console.log(item);
        res.render("photos/show", { item: item });
      }
    });
});

// ========================================================
// Comments Section Routes
// ========================================================
// NEW Route
app.get("/items/:id/comments/new", (req, res) => {
  Photo.findById(req.params.id, (err, photo) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { photo: photo });
    }
  });
});

// CREATE Route
app.post("/items/:id/comments", (req, res) => {
  let id = req.params.id;
  Photo.findById(id, (err, photo) => {
    if (err) {
      console.log(err);
    } else {
      Comment.create(
        {
          author: req.body.comment.author,
          text: req.body.comment.text
        },
        (err, comment) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(comment);
            photo.comments.push(comment);
            photo.save();
            res.redirect("/items/" + id);
          }
        }
      );
    }
  });
});

//Server start
app.listen(port, () => {
  console.log("Server has started.");
});
