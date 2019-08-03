let express = require("express");
// {mergeParams: true} is going to merge the route url into this file's params
let router = express.Router({ mergeParams: true });
let Comment = require("../modules/comment");
let Photo = require("../modules/photo");
let middleware = require("../middleware/index");

// ========================================================
// Comments Section Routes
// ========================================================
// NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
  Photo.findById(req.params.id, (err, photo) => {
    if (err || !photo) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("comments/new", { photo: photo });
    }
  });
});

// CREATE
router.post("/", (req, res) => {
  let id = req.params.id;
  Photo.findById(id, (err, photo) => {
    if (err || !photo) {
      req.flash("error", err.message);
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash("error", err.message);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          photo.comments.push(comment);
          photo.save();
          req.flash("success", "Successfully post a new comment!");
          res.redirect("/items/" + id);
        }
      });
    }
  });
});

// EDIT
router.get("/:cid/edit", middleware.isCommentOwner, (req, res) => {
  Photo.findById(req.params.id)
    .populate("comments")
    .exec((err, item) => {
      if (err || !item) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        item.comments.forEach(comment => {
          if (comment._id.equals(req.params.cid)) {
            res.render("comments/edit", {
              comment: comment,
              item: item
            });
          }
        });
      }
    });
});

// UPDATE
router.put("/:cid", middleware.isCommentOwner, (req, res) => {
  Photo.findById(req.params.id)
    .populate("comments")
    .exec((err, item) => {
      if (err || !item) {
        req.flash("error", err.message);
      }
      item.comments.forEach(comment => {
        if (comment._id.equals(req.params.cid)) {
          Comment.findByIdAndUpdate(
            comment._id,
            req.body.comment,
            (err, comment) => {
              if (err) {
                req.flash("error", err.message);
              } else {
                req.flash("success", "Successfully update your comment!");
                res.redirect("/items/" + req.params.id);
              }
            }
          );
        }
      });
    });
});

// DESTROY
router.delete("/:cid", middleware.isCommentOwner, (req, res) => {
  Photo.findById(req.params.id)
    .populate("comments")
    .exec((err, item) => {
      if (err || !item) {
        req.flash("error", err.message);
      }
      item.comments.forEach(comment => {
        if (comment._id.equals(req.params.cid)) {
          Comment.findByIdAndRemove(comment._id, (err, comment) => {
            if (err) {
              req.flash("error", err.message);
            } else {
              req.flash("success", "Successfully delete your comment!");
              res.redirect("/items/" + req.params.id);
            }
          });
        }
      });
    });
});

module.exports = router;
