let express = require("express");
// {mergeParams: true} is going to merge the route url into this file's params
let router = express.Router({ mergeParams: true });
let Comment = require("../modules/comment");
let Photo = require("../modules/photo");

// ========================================================
// Comments Section Routes
// ========================================================
// NEW Route
router.get("/new", isLoggedIn, (req, res) => {
  Photo.findById(req.params.id, (err, photo) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { photo: photo });
    }
  });
});

// CREATE Route
router.post("/", (req, res) => {
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

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
