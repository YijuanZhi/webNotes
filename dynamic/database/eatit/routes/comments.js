let express = require("express");
// {mergeParams: true} is going to merge the route url into this file's params
let router = express.Router({ mergeParams: true });
let Comment = require("../modules/comment");
let Photo = require("../modules/photo");

// ========================================================
// Comments Section Routes
// ========================================================
// NEW
router.get("/new", isLoggedIn, (req, res) => {
  Photo.findById(req.params.id, (err, photo) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { photo: photo });
    }
  });
});

// CREATE
router.post("/", (req, res) => {
  let id = req.params.id;
  Photo.findById(id, (err, photo) => {
    if (err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          photo.comments.push(comment);
          photo.save();
          res.redirect("/items/" + id);
        }
      });
    }
  });
});

// EDIT
router.get("/:cid/edit", isOwner, (req, res) => {
  Photo.findById(req.params.id)
    .populate("comments")
    .exec((err, item) => {
      item.comments.forEach(comment => {
        if (comment._id.equals(req.params.cid)) {
          res.render("comments/edit", {
            comment: comment,
            item: item
          });
        }
      });
    });
});

// UPDATE
router.put("/:cid", isOwner, (req, res) => {
  Photo.findById(req.params.id)
    .populate("comments")
    .exec((err, item) => {
      item.comments.forEach(comment => {
        if (comment._id.equals(req.params.cid)) {
          Comment.findByIdAndUpdate(
            comment._id,
            req.body.comment,
            (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                res.redirect("/items/" + req.params.id);
              }
            }
          );
        }
      });
    });
});

// DESTROY
router.delete("/:cid", isOwner, (req, res) => {
  Photo.findById(req.params.id)
    .populate("comments")
    .exec((err, item) => {
      item.comments.forEach(comment => {
        if (comment._id.equals(req.params.cid)) {
          Comment.findByIdAndRemove(comment._id, (err, comment) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully delete comment:");
              console.log(comment);
              res.redirect("/items/" + req.params.id);
            }
          });
        }
      });
    });
});

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// check if the user has logged in and is the owner
function isOwner(req, res, next) {
  if (req.isAuthenticated()) {
    Photo.findById(req.params.id, (err, item) => {
      if (item.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect("back");
      }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = router;
