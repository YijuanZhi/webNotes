let express = require("express");
let router = express.Router({ mergeParams: true });
let User = require("../modules/user");
let passport = require("passport");
let flash = require("connect-flash");

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
      req.flash("error", err.message);
      res.redirect("back");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash(
        "success",
        "Successfully registered! Welcome, " + req.user.username
      );
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
    failureRedirect: "/login",
    successFlash: "Successfully logged in!",
    failureFlash: "Can not log in."
  }),
  (req, res) => {}
);

// ========================LOGOUT========================
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Successfully logged out!");
  res.redirect("/items");
});

module.exports = router;
