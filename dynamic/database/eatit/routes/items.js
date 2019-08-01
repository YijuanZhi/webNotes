let express = require("express");
let router = express.Router();
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
router.get("/new", isLoggedIn, (req, res) => {
  res.render("photos/new");
});

//SHOW
router.get("/:id", (req, res) => {
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
