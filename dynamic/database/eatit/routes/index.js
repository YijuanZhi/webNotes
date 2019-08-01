let express = require("express");
let router = express.Router();
let User = require("../modules/user");
let passport = require("passport");

// ========================================================
// BASIC VIEWS ROUTES
// ========================================================
router.get("/", (req, res) => {
  res.render("home");
});

// ========================================================
// AUTHENTICATION ROUTES
// ========================================================
router.get("/register", (req, res) => {
  res.render("./auth/register");
});

router.post("/register", (req, res) => {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.render("home");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/items");
    });
  });
});

router.get("/login", (req, res) => {
  res.render("./auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/items",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/items");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
