let middlewareObj = {};
let Comment = require("../modules/comment");
let Photo = require("../modules/photo");

middlewareObj.isCommentOwner =
  // check if the user has logged in and is the comment's owner
  (req, res, next) => {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.cid, (err, comment) => {
        // when there is err or comment is not defined(null)
        if (err || !comment) {
          req.flash("error", err.message);
          res.redirect("back");
        } else if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You do not have the permission to do so.");
          res.redirect("back");
        }
      });
    } else {
      req.flash("error", "You do not have the permission to do so.");
      res.redirect("back");
    }
  };

middlewareObj.isItemOwner =
  // check if the user has logged in and is the item's owner
  (req, res, next) => {
    if (req.isAuthenticated()) {
      Photo.findById(req.params.id, (err, item) => {
        if (err || !item) {
          req.flash("error", err.message);
          res.redirect("back");
        } else if (item.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You do not have the permission to do so.");
          res.redirect("back");
        }
      });
    } else {
      req.flash("error", "You do not have the permission to do so.");
      res.redirect("back");
    }
  };

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to log in to do so.");
  res.redirect("/login");
};

module.exports = middlewareObj;
