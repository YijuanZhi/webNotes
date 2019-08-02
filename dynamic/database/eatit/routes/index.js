let express = require("express");
let router = express.Router({ mergeParams: true });
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

// ========================REGISTER========================
router.get("/register", (req, res) => {
  res.render("./auth/register");
});

// Creating user and save it inside mongdb
// then log in with the account
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

// ========================LOGIN========================
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/items",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

// ========================LOGOUT========================
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/items");
});

module.exports = router;
