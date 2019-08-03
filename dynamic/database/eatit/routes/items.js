let express = require("express");
let router = express.Router({ mergeParams: true });
let Photo = require("../modules/photo");
let middleware = require("../middleware/index");

// ========================================================
// ITEMS ROUTES
// ========================================================
router.get("/", (req, res) => {
  Photo.find({}, (err, items) => {
    if (err) {
      req.flash("error", err.message);
    } else {
      res.render("photos/items", {
        items: items
      });
    }
  });
});

//NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("photos/new");
});

//CREATE
router.post("/", (req, res) => {
  let newItem = {
    name: req.body.name,
    url: req.body.url,
    description: req.body.description,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  };
  Photo.create(newItem, (err, item) => {
    if (err) {
      req.flash("error", err.message);
    } else {
      req.flash("success", "Successful create a new item!");
      res.redirect("/items");
    }
  });
});

//SHOW
router.get("/:id", (req, res) => {
  let curId = req.params.id;
  // or i can use findById(req.params.id, .... )
  // the item will an JSON object instead of an array with find()
  Photo.findById({ _id: curId })
    .populate("comments")
    .exec((err, item) => {
      if (err || !item) {
        req.flash("error", "Photo not found.");
        res.redirect("back");
      } else {
        res.render("photos/show", { item: item });
      }
    });
});

// EDIT
router.get("/:id/edit", middleware.isItemOwner, (req, res) => {
  Photo.findById(req.params.id, (err, item) => {
    if (err || !item) {
      req.flash("error", "Photo not found.");
    }
    res.render("photos/edit", { item: item });
  });
});

// UPDATE
router.put("/:id", middleware.isItemOwner, (req, res) => {
  Photo.findByIdAndUpdate(req.params.id, req.body.photo, (err, item) => {
    if (err) {
      req.flash("error", err.message);
    }
    res.redirect("/items/" + req.params.id);
  });
});

//DESTROY
router.delete("/:id", middleware.isItemOwner, (req, res) => {
  Photo.findByIdAndRemove(req.params.id, (err, item) => {
    if (err) {
      req.flash("error", err.message);
    }
    res.redirect("/items");
  });
});

module.exports = router;
