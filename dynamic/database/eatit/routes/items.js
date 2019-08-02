let express = require("express");
let router = express.Router({ mergeParams: true });
let Photo = require("../modules/photo");

// ========================================================
// ITEMS ROUTES
// ========================================================
router.get("/", (req, res) => {
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
      console.log("Something went wrong: " + err);
    } else {
      console.log("New item successfully added: ");
      console.log(item);
    }
  });
  res.redirect("/items");
});

//NEW
router.get("/new", isLoggedIn, (req, res) => {
  res.render("photos/new");
});

//SHOW
router.get("/:id", (req, res) => {
  let curId = req.params.id;
  // or i can use findById(req.params.id, .... )
  // the item will an JSON object instead of an array with find()
  Photo.findById({ _id: curId })
    .populate("comments")
    .exec((err, item) => {
      if (err) {
        console.log(err);
      } else {
        res.render("photos/show", { item: item });
      }
    });
});

// EDIT
router.get("/:id/edit", isOwner, (req, res) => {
  Photo.findById(req.params.id, (err, item) => {
    res.render("photos/edit", { item: item });
  });
});

// UPDATE
router.put("/:id", isOwner, (req, res) => {
  Photo.findByIdAndUpdate(req.params.id, req.body.photo, (err, item) => {
    res.redirect("/items/" + req.params.id);
  });
});

//DESTROY
router.delete("/:id", isOwner, (req, res) => {
  Photo.findByIdAndRemove(req.params.id, (err, item) => {
    res.redirect("/items");
  });
});

// check if user has logged in
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
